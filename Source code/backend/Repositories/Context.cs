using System;
using System.Collections.Generic;
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
    public virtual DbSet<Account> Bookings { get; set; }
    public virtual DbSet<Account> Employees { get; set; }
    public virtual DbSet<Account> Customers { get; set; }

}
