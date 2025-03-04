using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.DurableTask;
using Microsoft.DurableTask.Client;
using Microsoft.Extensions.Logging;

namespace YouTubeSyncFunction
{
    public class Orchestrator(IOrchestratorHelpers orchestratorHelpers)
    {
        private readonly IOrchestratorHelpers _orchestratorHelpers = orchestratorHelpers;

        [Function("Orchestrator")]
        public async Task<List<string>> RunOrchestrator(
            [OrchestrationTrigger] TaskOrchestrationContext context)
        {
            var outputs = new List<string>();

            outputs.Add(await context.CallActivityAsync<string>(nameof(RunSyncYouTube), outputs));
            outputs.Add(await context.CallActivityAsync<string>(nameof(RunYouTubeDownloader), outputs));

            return outputs;
        }

        [Function(nameof(RunSyncYouTube))]
        public async Task<string> RunSyncYouTube([ActivityTrigger] FunctionContext context)
        {
            ILogger log = context.GetLogger("RunSyncYouTube");
            var status = await _orchestratorHelpers.SyncYouTube(log);
            return status;
        }

        [Function(nameof(RunYouTubeDownloader))]
        public async Task<string> RunYouTubeDownloader([ActivityTrigger] FunctionContext context)
        {
            ILogger log = context.GetLogger("RunYouTubeDownloader");
            var status = await _orchestratorHelpers.YouTubeDownloader(log);
            return status;
        }

        [Function("Orchestrator_HttpStart")]
        public static async Task<HttpResponseData> HttpStart(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequestData req,
            [DurableClient] DurableTaskClient client,
            FunctionContext context)
        {
            ILogger log = context.GetLogger("Orchestrator_HttpStart");
            // Function input comes from the request content.
            string instanceId = await client.ScheduleNewOrchestrationInstanceAsync(
                nameof(Orchestrator));

            log.LogInformation("Started orchestration with ID = '{instanceId}'.", instanceId);

            return await client.CreateCheckStatusResponseAsync(req, instanceId);
        }

        [Function("Orchestrator_TimerStart")]
        public static async Task TimerStart(
            [TimerTrigger("0 0 3 * * *")] TimerInfo timerInfo,
            [DurableClient] IDurableClient starter,
            ILogger log)
        {
            // Function input comes from the request content.
            string instanceId = await starter.StartNewAsync("Orchestrator", null);

            log.LogInformation("Started orchestration with ID = '{instanceId}'.", instanceId);

            //return starter.CreateCheckStatusResponse(req, instanceId);
        }
    }
}