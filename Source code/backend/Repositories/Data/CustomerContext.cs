using Microsoft.EntityFrameworkCore;
using KVCS.Model;

namespace KVCS.Context;

public class CustomerContext : DbContext
{
    public CustomerContext(DbContextOptions<CustomerContext> options)
        : base(options)
    {
    }

    public DbSet<Customer> Customers { get; set; } = null!;
}

