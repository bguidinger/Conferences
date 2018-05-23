namespace Focus2018.VirtualEntities
{
    using Microsoft.Xrm.Sdk;
    using Microsoft.Xrm.Sdk.Extensions;
    using Microsoft.Xrm.Sdk.Query;
    using System;

    public class RetrieveMultiple : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.Get<IPluginExecutionContext>();
            var service = serviceProvider.GetOrganizationService(Guid.Empty);

            var retriever = serviceProvider.Get<IEntityDataSourceRetrieverService>();
            var dataSource = retriever.RetrieveEntityDataSource();

            var metadata = service.GetEntityMetadata(context.PrimaryEntityName);

            var query = context.InputParameterOrDefault<QueryExpression>("Query");

            var dataService = new DataService(metadata);
            var entities = dataService.GetEntities(query);

            context.OutputParameters["BusinessEntityCollection"] = entities;
        }
    }
}