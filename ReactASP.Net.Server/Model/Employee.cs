namespace PostgreSQL.Data
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string[] Department { get; set; }
        public ICollection<EmployeeDepartment> EmployeeDepartments { get; set; } = new HashSet<EmployeeDepartment>();
    }
}
