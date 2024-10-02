using Microsoft.EntityFrameworkCore;
using Repositories.Models;

namespace Repositories.Data;

public class EmployeeContext : DbContext
{
    public EmployeeContext(DbContextOptions<EmployeeContext> options)
        : base(options)
    {
    }

    public DbSet<Employee> Employees { get; set; }
}

