using Microsoft.EntityFrameworkCore;
using KVCS.Model;

namespace KVCS.Context;

public class EmployeeContext : DbContext
{
    public EmployeeContext(DbContextOptions<EmployeeContext> options)
        : base(options)
    {
    }

    public DbSet<Employee> Employees { get; set; }
}

