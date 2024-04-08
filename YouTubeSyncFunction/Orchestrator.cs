using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.DurableTask;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace YouTubeSyncFunction
{
    public class Orchestrator
    {
        private readonly IOrchestratorHelpers _orchestratorHelpers;
        public Orchestrator(IOrchestratorHelpers orchestratorHelpers)
        {

            _orchestratorHelpers = orchestratorHelpers;

        }
        [FunctionName("Orchestrator")]
        public async Task<List<string>> RunOrchestrator(
            [OrchestrationTrigger] IDurableOrchestrationContext context)
        {
            var outputs = new List<string>();

            outputs.Add(await context.CallActivityAsync<string>(nameof(RunSyncYouTube), outputs));
            outputs.Add(await context.CallActivityAsync<string>(nameof(RunYouTubeDownloader), outputs));

            return outputs;
        }

        [FunctionName(nameof(RunSyncYouTube))]
        public async Task<string> RunSyncYouTube([ActivityTrigger] IDurableActivityContext context, ILogger log)
        {
            var status = await _orchestratorHelpers.SyncYouTube(log);
            return status;
        }

        [FunctionName(nameof(RunYouTubeDownloader))]
        public async Task<string> RunYouTubeDownloader([ActivityTrigger] IDurableActivityContext context, ILogger log)
        {
            var status = await _orchestratorHelpers.YouTubeDownloader(log);
            return status;
        }

        [FunctionName("Orchestrator_HttpStart")]
        public static async Task<HttpResponseMessage> HttpStart(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequestMessage req,
            [DurableClient] IDurableOrchestrationClient starter,
            ILogger log)
        {
            // Function input comes from the request content.
            string instanceId = await starter.StartNewAsync("Orchestrator", null);

            log.LogInformation("Started orchestration with ID = '{instanceId}'.", instanceId);

            return starter.CreateCheckStatusResponse(req, instanceId);
        }

        [FunctionName("Orchestrator_TimerStart")]
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