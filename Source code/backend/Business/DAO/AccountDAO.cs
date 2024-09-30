using Microsoft.EntityFrameworkCore;
using KVCS.Context;
using KVCS.Model;

namespace KVCS.Business;
public class AccountDAO {
    private readonly AccountContext _context = null!;

    public AccountDAO(AccountContext context){
        if ( context is null ) {
            throw new Exception("Context is not initialized");
        }
        _context = context;

    }

    public async Task<Account?> LoginByEmail( string email, string password ){
        return await _context.Accounts.FromSql($"SELECT * FROM Account WHERE email = {email} AND password = {password} COLLATE SQL_Latin1_General_CP1_CS_AS").FirstOrDefaultAsync();
    }
}
