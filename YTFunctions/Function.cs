using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.DurableTask;
using Microsoft.DurableTask.Client;
using Microsoft.Extensions.Logging;
using System.Threading;

namespace YTFunctions
{
    public class Function
    {
        private readonly IHelper _helper;
        public Function(IHelper helper)
        {
            _helper = helper;
        }
        [Function(nameof(Function))]
        public async Task<List<string>> RunOrchestrator(
            [OrchestrationTrigger] TaskOrchestrationContext context)
        {
            ILogger logger = context.CreateReplaySafeLogger(nameof(Function));
            logger.LogInformation("Saying hello.");
            var outputs = new List<string>();

            // Replace name and input with values relevant for your Durable Functions Activity
            outputs.Add(await context.CallActivityAsync<string>(nameof(RunSyncYouTube), "test"));
            outputs.Add(await context.CallActivityAsync<string>(nameof(RunYouTubeDownloader), "test"));

            return outputs;
        }

        [Function(nameof(RunSyncYouTube))]
        public async Task<string> RunSyncYouTube([ActivityTrigger] string name, FunctionContext executionContext)
        {
            ILogger logger = executionContext.GetLogger("RunSyncYouTube");
            logger.LogInformation("sync");
            var status = await _helper.SynceYouTube(logger);
            return status;
           // return "Sync: Success";
        }

        [Function(nameof(RunYouTubeDownloader))]
        public async Task<string> RunYouTubeDownloader([ActivityTrigger] string name, FunctionContext executionContext)
        {
            ILogger logger = executionContext.GetLogger("RunYouTubeDownloader");
            logger.LogInformation("downloader");
            var status = await _helper.YouTubeDownloader(logger);
            return status;
        }

        [Function("Function_HttpStart")]
        public async Task<HttpResponseData> HttpStart(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequestData req,
            [DurableClient] DurableTaskClient client,
            FunctionContext executionContext)
        {
            ILogger logger = executionContext.GetLogger("Function_HttpStart");

            // Function input comes from the request content.
            string instanceId = await client.ScheduleNewOrchestrationInstanceAsync(
                nameof(Function));

            logger.LogInformation("Started orchestration with ID = '{instanceId}'.", instanceId);

            // Returns an HTTP 202 response with an instance management payload.
            // See https://learn.microsoft.com/azure/azure-functions/durable/durable-functions-http-api#start-orchestration
            return await client.CreateCheckStatusResponseAsync(req, instanceId);
        }

        [Function("Function_TimerStart")]
        public async Task TimerStart([TimerTrigger("0 0 3 * * *")] TimerInfo myTimer,
                        [DurableClient] DurableTaskClient client,
            FunctionContext executionContext)
        {
            ILogger logger = executionContext.GetLogger("Function_HttpStart");

            // Function input comes from the request content.
            string instanceId = await client.ScheduleNewOrchestrationInstanceAsync(
                nameof(Function));

            logger.LogInformation("Started orchestration with ID = '{instanceId}'.", instanceId);

            // Returns an HTTP 202 response with an instance management payload.
            // See https://learn.microsoft.com/azure/azure-functions/durable/durable-functions-http-api#start-orchestration
          //  return await client.CreateCheckStatusResponseAsync(myTimer, instanceId);

        }
    }
}
