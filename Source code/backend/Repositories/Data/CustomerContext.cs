using Microsoft.EntityFrameworkCore;
using Repositories.Models;

namespace Repositories.Data;

public class CustomerContext : DbContext
{
    public CustomerContext(DbContextOptions<CustomerContext> options)
        : base(options)
    {
    }

    public DbSet<Customer> Customers { get; set; } = null!;
}

