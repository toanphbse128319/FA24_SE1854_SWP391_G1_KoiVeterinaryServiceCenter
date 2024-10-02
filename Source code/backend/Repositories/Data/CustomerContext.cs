using Microsoft.EntityFrameworkCore;
using Repositories.Model;

namespace Repositories.Data;

public class CustomerContext : DbContext
{
    public CustomerContext(DbContextOptions<CustomerContext> options)
        : base(options)
    {
    }

    public DbSet<Customer> Customers { get; set; } = null!;
}

