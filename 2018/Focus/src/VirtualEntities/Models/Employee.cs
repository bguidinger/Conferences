namespace Focus2018.VirtualEntities
{
    using System;

    public class Employee : IModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid EmployerId { get; set; }
    }
}