using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using Repositories.Model;
using Helper;

namespace Repositories.Repository;

public class AccountRepository : GenericRepository<Account>
{

    public AccountRepository(Context context)
    {
        _context = context;
    }

    public async Task<Account?> Login(LoginInformation info)
    {
        //Check for any character
        string pat = @"\D";
        MatchCollection result = Regex.Matches(info.Info, pat);
        if (result.Count > 0)
        {
            return await LoginByEmail(info.Info, info.Password);
        }
        return await LoginByPhoneNumber(info.Info, info.Password);

    }

    public async Task<Account?> LoginByPhoneNumber(string phone, string password)
    {
        return await _context.Accounts.FromSql($"SELECT * FROM Account WHERE PhoneNumber = {phone} AND password = {password} COLLATE SQL_Latin1_General_CP1_CS_AS").FirstOrDefaultAsync();
    }

    public async Task<Account?> LoginByEmail(string email, string password)
    {
        return await _context.Accounts.FromSql($"SELECT * FROM Account WHERE email = {email} AND password = {password} COLLATE SQL_Latin1_General_CP1_CS_AS").FirstOrDefaultAsync();
    }
}
