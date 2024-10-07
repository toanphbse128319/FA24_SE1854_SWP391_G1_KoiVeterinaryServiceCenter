#nullable disable
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

using Repositories.Model;
namespace Repositories;

public class Context : DbContext {

    public Context(){

    }

    public Context(DbContextOptions<Context> options)
        : base(options){

    }

    public static string GetConnectionString(string connectionStringName)
    {
        var config = new ConfigurationBuilder()
            .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
            .AddJsonFile("appsettings.json")
            .Build();

        string connectionString = config.GetConnectionString(connectionStringName);
        return connectionString;
    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer(GetConnectionString("DefaultConnection"));

    public virtual DbSet<Account> Accounts { get; set; }
    public virtual DbSet<Booking> Bookings { get; set; }
    public virtual DbSet<Employee> Employees { get; set; }
    public virtual DbSet<Customer> Customers { get; set; }
    public virtual DbSet<FAQ> FAQs { get; set; }
    public virtual DbSet<Post> Posts { get; set; }
    public virtual DbSet<Service> Services { get; set; }
    public virtual DbSet<ServiceDeliveryMethod> ServiceDeliveryMethods { get; set; }
    public virtual DbSet<AnimalType> AnimalTypes { get; set; }  

}
