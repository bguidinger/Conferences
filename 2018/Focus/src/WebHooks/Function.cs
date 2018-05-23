namespace Focus2018.WebHook
{
    using System.Net;
    using System.Net.Http;
    using System.Runtime.Serialization.Json;
    using System.Threading.Tasks;
    using Microsoft.Azure.WebJobs;
    using Microsoft.Azure.WebJobs.Extensions.Http;
    using Microsoft.Azure.WebJobs.Host;
    using Microsoft.Xrm.Sdk;

    public static class Function
    {
        [FunctionName("Function")]
        public static async Task<HttpResponseMessage> Run([HttpTrigger(AuthorizationLevel.Function, "POST", Route = null)]HttpRequestMessage req, TraceWriter log)
        {
            // Parse the context from the request body.
            var serializer = new DataContractJsonSerializer(typeof(RemoteExecutionContext));
            var content = await req.Content.ReadAsStreamAsync();
            var context = serializer.ReadObject(content) as RemoteExecutionContext;

            // Use context just like you would in a plugin!
            log.Info(context.PrimaryEntityName);
            log.Info(context.PrimaryEntityId.ToString("B"));

            return req.CreateResponse(HttpStatusCode.OK);
        }
    }
}