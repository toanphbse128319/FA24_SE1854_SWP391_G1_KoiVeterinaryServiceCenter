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

    public Task<Account?> FindEmailAsync(string email){
        return _context.Accounts.FirstOrDefaultAsync(account => account.Email == email)!;
    }

    public Account FindPhoneNumber(string phone){
        return _context.Accounts.FirstOrDefault(account => account.PhoneNumber == phone)!;
    }

    public Task<Account?> FindPhoneNumberAsync(string PhoneNumber){
        return _context.Accounts.FirstOrDefaultAsync(account => account.PhoneNumber == PhoneNumber)!;
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
                account.PhoneNumber == phone && 
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

    public string PrepareMail(string pass){
        FileManager file = new FileManager(Constants.Mail.signUpEmailLocation);
        string result = file.ReadFile();
        result = result.Replace("000000", pass);
        return result;
    }

    public async Task<string?> CustomerSignUpAsync(Account account){
        int index = (await base.GetAllAsync()).Count;
        account.AccountID = "A" + index;
        account.RoleID = "R002";
        account.IsActive = false;
        Random rnd = new Random();
        int luckyNumber = rnd.Next(100000, 999999);
        Console.WriteLine("Created OTP: " + luckyNumber);

        account.Status = (Constants.Account.WaitingForOTPMessage + luckyNumber + " " + DateTime.Now.ToString()) ;

        await base.CreateAsync(account);

        try{
            Mail mail = new Mail(account.Email);
            string subject = "Signup confirmation";
            string message = PrepareMail(luckyNumber.ToString());
            mail.SetMessage(subject, message);
            mail.SetHTMLMail();
            mail.Send();
        } catch (Exception ex){
            Console.WriteLine(ex);
            return "Unable to send mail";
        }    

        return "Created successfully";
    }

    public async Task<string?> CheckOtp(LoginInformation info){
        Account? result;
        string pat = @"\D";
        MatchCollection matched = Regex.Matches(info.Info, pat);
        if (matched.Count > 0)
            result = await FindEmailAsync(info.Info);
        else
            result = await FindPhoneNumberAsync(info.Info);

        if( result == null )
            return "Cannot find account with that ID";

        if( result.Status.Contains(Constants.Account.WaitingForOTPMessage) == false ){
            return "No Need for OTP";
        }

        string[] statuses = result.Status.Split(' ');

        string luckyNumber = statuses[3];
        DateTime timeSinceCreated = DateTime.Parse(statuses[4] + ' ' + statuses[5]);
        if( timeSinceCreated.AddMinutes(10) <= DateTime.Now ){
            return "OTP password has expired";
        }
        
        if( luckyNumber != info.Password ){
            return "Wrong OTP";
        }

        result.Status = "Normal";
        result.IsActive = true;
        await base.UpdateAsync(result);
        return "OTP verify successfully";
    }
}
