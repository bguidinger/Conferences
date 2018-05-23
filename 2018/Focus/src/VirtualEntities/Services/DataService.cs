namespace Focus2018.VirtualEntities
{
    using Microsoft.Xrm.Sdk;
    using Microsoft.Xrm.Sdk.Metadata;
    using Microsoft.Xrm.Sdk.Query;
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public class DataService
    {
        private EntityMetadata _metadata;

        public DataService(EntityMetadata metadata)
        {
            _metadata = metadata;
        }

        public EntityCollection GetEntities(QueryExpression query)
        {
            var records = GetRecords(_metadata.ExternalName);

            var entities = new EntityCollection();
            foreach (var record in records)
            {
                var entity = GetEntity(record.Id);
                entities.Entities.Add(entity);
            }
            return entities;
        }

        public Entity GetEntity(Guid id)
        {
            var record = GetRecords(_metadata.ExternalName).FirstOrDefault(x => x.Id == id);

            var entity = new Entity(_metadata.LogicalName);
            foreach (var attribute in _metadata.Attributes)
            {
                var value = record.GetType().GetProperty(attribute.ExternalName).GetValue(record);
                entity[attribute.LogicalName] = value;
            }
            return entity;
        }

        private IEnumerable<IModel> GetRecords(string externalName)
        {
            switch (externalName)
            {
                case "Employee":
                    return new List<Employee>
                    {
                        new Employee() { Id = new Guid("00000000-0000-0000-0000-000000000001"), Name = "John Smith" },
                        new Employee() { Id = new Guid("00000000-0000-0000-0000-000000000002"), Name = "Jane Doe" }
                    };
                case "Employer":
                    return new List<Employer>
                    {
                        new Employer() { Id = new Guid("00000000-0000-0000-0000-000000000001"), Name = "AdventureWorks LLC" },
                        new Employer() { Id = new Guid("00000000-0000-0000-0000-000000000002"), Name = "Fabrikam, Inc." }
                    };
                default:
                    return null;
            }
        }
    }
}