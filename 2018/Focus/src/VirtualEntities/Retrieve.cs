namespace Focus2018.VirtualEntities
{
    using Microsoft.Xrm.Sdk;
    using Microsoft.Xrm.Sdk.Extensions;
    using System;

    public class Retrieve : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            // No longer have to do this! We now have extension methods.
            //var context = serviceProvider.GetService(typeof(IPluginExecutionContext)) as IPluginExecutionContext;
            //var factory = serviceProvider.GetService(typeof(IOrganizationServiceFactory)) as IOrganizationServiceFactory;
            //var service = factory.CreateOrganizationService(Guid.Empty);

            var context = serviceProvider.Get<IPluginExecutionContext>();
            var service = serviceProvider.GetOrganizationService(Guid.Empty);

            var retriever = serviceProvider.Get<IEntityDataSourceRetrieverService>();
            var dataSource = retriever.RetrieveEntityDataSource();

            // Can retrieve custom fields from the data source, for example:
            //var url = dataSource.GetAttributeValue<string>("url");
            //var username = dataSource.GetAttributeValue<string>("username");
            //var password = dataSource.GetAttributeValue<string>("password");

            var metadata = service.GetEntityMetadata(context.PrimaryEntityName);

            var dataService = new DataService(metadata);
            var entity = dataService.GetEntity(context.PrimaryEntityId);

            context.OutputParameters["BusinessEntity"] = entity;
        }
    }
}