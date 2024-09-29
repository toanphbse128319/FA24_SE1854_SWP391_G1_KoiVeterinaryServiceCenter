using Microsoft.EntityFrameworkCore;
using KVCS.Model;

namespace KVCS.Context;

public class AccountContext : DbContext
{
    public AccountContext(DbContextOptions<AccountContext> options)
        : base(options)
    {
    }

    public DbSet<Account> Accounts { get; set; }
}
