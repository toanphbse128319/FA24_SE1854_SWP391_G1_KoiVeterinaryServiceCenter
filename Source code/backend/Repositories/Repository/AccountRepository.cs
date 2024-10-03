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

    public Account FindEmail(string email){
        return _context.Accounts.FirstOrDefault(account => account.Email == email)!;
    }

    public Account FindPhoneNumber(string phone){
        return _context.Accounts.FirstOrDefault(account => account.PhoneNumber == phone)!;
    }

    public Task<Account?> FindEmailAsync(String email){
        return _context.Accounts.FirstOrDefaultAsync(account => account.Email == email)!;
    }

    public Task<Account?> FindPhoneNumberAsync(String email){
        return _context.Accounts.FirstOrDefaultAsync(account => account.Email == email)!;
    }

    public async Task<Account?> LoginAsync(LoginInformation info)
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
        return await _context.Accounts.FirstOrDefaultAsync(account => 
                account.Password == phone && 
                account.Password == password
        );
    }

    public async Task<Account?> LoginByEmail(string email, string password)
    {
        return await _context.Accounts.FirstOrDefaultAsync( account =>
                account.Email == email &&
                account.Password == password
        );
    }

    public async Task<Account?> SignUpAsync(Account account){
    
        await base.CreateAsync(account);
        return await _context.Accounts.FindAsync(account.AccountID);
    }
}
