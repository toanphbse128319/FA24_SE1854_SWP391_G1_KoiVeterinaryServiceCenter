using Microsoft.EntityFrameworkCore;
using Repositories.Models;

namespace Repositories.Data;

public class AccountContext : DbContext
{
    public AccountContext(DbContextOptions<AccountContext> options)
        : base(options)
    {
    }

    public DbSet<Account> Accounts { get; set; }
}
