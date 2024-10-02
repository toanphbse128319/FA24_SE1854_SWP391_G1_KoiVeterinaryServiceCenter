using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using Repositories.Data;
using Repositories.Model;

namespace Business.DAO;
public class AccountDAO
{
    private readonly AccountContext _context = null!;

    public AccountDAO(AccountContext context)
    {
        if (context is null)
        {
            throw new Exception("Context is not initialized");
        }
        _context = context;
    }

    public async Task<Account?> Login(string text, string password)
    {
        //Check for any character
        string pat = @"\D";
        MatchCollection result = Regex.Matches(text, pat);
        if (result.Count > 0)
        {
            return await LoginByEmail(text, password);
        }
        return await LoginByPhoneNumber(text, password);

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
