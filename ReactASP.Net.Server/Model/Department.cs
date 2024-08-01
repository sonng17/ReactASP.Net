namespace PostgreSQL.Data
{
    public class Department
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int EmployeeCount { get; set; }
        public ICollection<EmployeeDepartment> EmployeeDepartments { get; set; } = new HashSet<EmployeeDepartment>();
    }
}
              