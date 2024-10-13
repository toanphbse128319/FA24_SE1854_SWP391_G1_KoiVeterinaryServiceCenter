using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

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

    public void GetName(ref string? firstname, ref string? lastname, string accountID){
        CustomerRepository CustomerRepository = new CustomerRepository(_context);
        Customer? customer = CustomerRepository.SearchByAccountID(accountID);
        if( customer != null ){
            firstname = customer.FirstName;
            lastname = customer.Lastname;
            return;
        }

        EmployeeRepository EmployeeRepository = new EmployeeRepository(_context);
        Employee? Employee = EmployeeRepository.SearchByAccountID(accountID);
        if( Employee == null ){
            return;
        }
        firstname = Employee.FirstName;
        lastname = Employee.Lastname;
    }

    public async Task<string> LoginAsync(LoginInformation info)
    {
        if( info.IsEmpty() )
            return "Info and password cannot be empty";

        Account? found;
        //Check for any character
        string pat = @"\D";
        MatchCollection result = Regex.Matches(info.Info, pat);
        if (result.Count > 0)
            found = await LoginByEmail(info.Info, info.Password);
        else 
            found = await LoginByPhoneNumber(info.Info, info.Password);
        if( found == null )
            return "Invalid username or password!";
        if( found.Status.Contains(Constants.Account.WaitingForOTPMessage) )
            return "This account hasn't verify otp code";
        if( found.IsActive == false )
            return "Account has been disabled";

        string? lastname = null;
        string? firstname = null;
        GetName(ref lastname, ref firstname, found.AccountID);
        if( lastname == null || firstname == null ){
            return "Cannot find profile associate with this account";
        }

        Token token = new Token();
        RoleRepository RoleRepository = new RoleRepository(_context);
        var claims = new List<Claim>{
            new Claim("Id", Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Email, found.Email),
            new Claim(ClaimTypes.Role, RoleRepository.getRoleName(found.RoleID)),
            new Claim("Firstname", firstname),
            new Claim("Lastname", lastname)
        }; 

        token.Claims = claims;
        return token.GenerateToken(4);
    }

    //The EF.function.collate just to force EF core to be case sensitive
    public async Task<Account?> LoginByPhoneNumber(string phone, string password)
    {
        return await _context.Accounts.FirstOrDefaultAsync(account => 
                account.PhoneNumber == phone && 
                EF.Functions.Collate(account.Password, "SQL_Latin1_General_CP1_CS_AS") == password
        );
    }

    public async Task<Account?> LoginByEmail(string email, string password)
    {
        return await _context.Accounts.FirstOrDefaultAsync( account =>
                account.Email == email &&
                EF.Functions.Collate(account.Password, "SQL_Latin1_General_CP1_CS_AS") == password
        );
    }

    public string PrepareMail(string pass){
        FileManager file = new FileManager(Constants.Mail.signUpEmailLocation);
        string result = file.ReadFile();
        result = result.Replace("000000", pass);
        return result;
    }

    public async Task<string?> CustomerSignUpAsync(Account info){
        //Check if the paramter is null
        if( info.Email == null )
            return "Missing parameter: Email";
        if( info.PhoneNumber == null ) 
            return "Missing parameter: PhoneNumber";
        if( info.Password == null )
            return "Missing parameter: Password";
        //Check if parameter is empty
        if( info.Email == String.Empty )
            return "Email must not be empy";
        if( info.PhoneNumber == String.Empty ) 
            return "PhoneNumber must not be empy";
        if( info.Password == String.Empty )
            return "Password must not be empy";
        if( FindEmail(info.Email) != null )
            return "That email is already usd!";
        if( FindPhoneNumber(info.PhoneNumber) != null )
            return "That phone number is alreay used!";

        int index = (await base.GetAllAsync()).Count;
        info.AccountID = "A" + index;
        info.RoleID = "R002";
        info.IsActive = false;
        Random rnd = new Random();
        int luckyNumber = rnd.Next(100000, 999999);

        info.Status = (Constants.Account.WaitingForOTPMessage + luckyNumber + " " + DateTime.Now.ToString()) ;

        await base.CreateAsync(info);

        try{
            Mail mail = new Mail(info.Email);
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
        
        if( info.IsEmpty() )
            return "Info and password must not be empty!";
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
            return "OTP Code is incorrect";
        }

        result.Status = "Normal";
        result.IsActive = true;
        await base.UpdateAsync(result);
        return "OTP verify successfully";
    }
}
