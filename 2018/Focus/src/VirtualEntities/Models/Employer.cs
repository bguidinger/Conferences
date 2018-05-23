namespace Focus2018.VirtualEntities
{
    using System;

    public class Employer : IModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
    }
}