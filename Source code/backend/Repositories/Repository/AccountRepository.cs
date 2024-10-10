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
        if( account.AccountID == "" ){
            int index = _context.Accounts.ToList().Count;
            account.AccountID = "A" + index;
        }
        if( account.RoleID == "")
            account.RoleID = "R002";
        if( account.Status == "" )
            account.Status = "Normal";
        if( account.IsActive == false )
            account.IsActive = true;
        
        await base.CreateAsync(account);
        try{
            Mail mail = new Mail(account.Email);
            string subject = "Signup successfully!";
            string message = $"Thanks for signing up at our website with your email {account.Email}";
            mail.SetMessage(subject, message);
            mail.Send();
        } catch (Exception ex){
            Console.WriteLine(ex);
        }    

        return await base.GetByIdAsync(account.AccountID);
    }
}
