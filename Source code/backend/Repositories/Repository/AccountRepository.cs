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

    public Account FindEmail(string email)
    {
        return _context.Accounts.FirstOrDefault(account => account.Email == email)!;
    }

    public Task<Account?> FindEmailAsync(string email)
    {
        return _context.Accounts.FirstOrDefaultAsync(account => account.Email == email)!;
    }

    public Account FindPhoneNumber(string phone)
    {
        return _context.Accounts.FirstOrDefault(account => account.PhoneNumber == phone)!;
    }

    public Task<Account?> FindPhoneNumberAsync(string PhoneNumber)
    {
        return _context.Accounts.FirstOrDefaultAsync(account => account.PhoneNumber == PhoneNumber)!;
    }

    public void GetName(ref string? firstname, ref string? lastname, string accountID)
    {
        CustomerRepository CustomerRepository = new CustomerRepository(_context);
        Customer? customer = CustomerRepository.SearchByAccountID(accountID);
        if( customer != null ){
            firstname = customer.Firstname;
            lastname = customer.Lastname;
            return;
        }

        EmployeeRepository EmployeeRepository = new EmployeeRepository(_context);
        Employee? Employee = EmployeeRepository.SearchByAccountID(accountID);
        if (Employee == null)
        {
            return;
        }
        firstname = Employee.FirstName;
        lastname = Employee.Lastname;
    }

    public async Task<string> LoginAsync(LoginInformation info)
    {
        if (info.IsEmpty())
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
        if (found.Status.Contains(Constants.Account.WaitingForOTPMessage))
            return "This account hasn't verify otp code";
        if (found.IsActive == false)
            return "Account has been disabled";

        string? lastname = null;
        string? firstname = null;
        GetName(ref lastname, ref firstname, found.AccountID);
        if (lastname == null || firstname == null)
        {
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
        return await _context.Accounts.FirstOrDefaultAsync(account =>
                account.Email == email &&
                EF.Functions.Collate(account.Password, "SQL_Latin1_General_CP1_CS_AS") == password
        );
    }

    public async Task<string> AddAsync(Account account){
        if( account == null )
            return "Account is null";
        int index = (await base.GetAllAsync()).Count + 1;

        if( account.AccountID == null ) 
            account.AccountID = "A" + index;
        else if (account.AccountID.Count() == 0)
            account.AccountID = "A" + index;
        if( account.RoleID == null )
            account.RoleID = "R002";
        if( account.RoleID.ElementAt(0) != 'R' )
            account.RoleID = "R002";

        await base.CreateAsync(account);
        return account.AccountID;
    }

    public string PrepareMail(string pass){
        FileManager file = new FileManager(Constants.Mail.signUpEmailLocation);
        string result = file.ReadFile();
        result = result.Replace("000000", pass);
        return result;
    }

    public async Task<string?> CustomerSignUpAsync(CustomerSignupInformation info ){

        var transaction = await _context.Database.BeginTransactionAsync();
        string result = "";
        try{
            result = info.CheckEmpty();
            if( result != "Ok" )
                return result;

            if( await FindEmailAsync(info.Email) != null )
                return "That email is already used!";
            if( await FindPhoneNumberAsync(info.PhoneNumber) != null )
                return "That phone number is alreay used!";

            Account account = new Account(){
                AccountID = null,
                Email = info.Email,
                PhoneNumber = info.PhoneNumber,
                RoleID = null,
                Password = info.Password,
                Status = Constants.Account.WaitingForOTPMessage
            };
            //Planned to use the account.AccountID but for some reason,  
            //the runtime complain
            string accountID = await AddAsync(account);
            if( accountID == "Account is null" )
                return "Unable to create account"; 

            CustomerRepository customerRepo = new CustomerRepository(_context);
            Customer customer = new Customer(){
                AccountID = account.AccountID,
                Firstname = info.Firstname,
                Lastname = info.Lastname,
                Sex = info.Sex,
                BirthDay = info.Birthday,
                Address = info.Address,
                Status = "Normal"
            };
            result = await customerRepo.AddAsync(customer);
            if( result[0] != 'C' )
                return result;

            await transaction.CommitAsync();
            return result = "Created successfully";
        } finally {
            if( result != "Created successfully" )
                await transaction.RollbackAsync();
        }
    }

    public async Task<string> SendOtpMail(string info){
        if( info == null )
            return "Info cannot be null!";
        if( info.Count() == 0 )
            return "Info must not be empty!";
        Account? account;
        string pat = @"\D";
        MatchCollection matched = Regex.Matches(info, pat);
        if (matched.Count > 0)
            account = await FindEmailAsync(info);
        else
            account = await FindPhoneNumberAsync(info);
        if( account == null )
            return "Unable to find the account";

        if( account.Status.Contains(Constants.Account.WaitingForOTPMessage) == false )
            return "No need for OTP";

        Random rnd = new Random();
        int luckyNumber = rnd.Next(100000, 999999);
        account.Status = (Constants.Account.WaitingForOTPMessage + luckyNumber + " " + DateTime.Now.ToString()) ;
        await base.UpdateAsync(account);
        try{
            Mail mail = new Mail(account.Email);
            string subject = "Signup confirmation";
            string message = PrepareMail(luckyNumber.ToString());
            mail.SetMessage(subject, message);
            mail.SetHTMLMail();
            mail.Send();
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return "Unable to send mail";
        }    
        return "Send mail successfully";
    }

    public async Task<string?> CheckOtp(LoginInformation info)
    {

        if (info.IsEmpty())
            return "Info and password must not be empty!";
        Account? result;
        string pat = @"\D";
        MatchCollection matched = Regex.Matches(info.Info, pat);
        if (matched.Count > 0)
            result = await FindEmailAsync(info.Info);
        else
            result = await FindPhoneNumberAsync(info.Info);

        if (result == null)
            return "Cannot find account with that ID";

        if( result.Status.Contains(Constants.Account.WaitingForOTPMessage) == false ){
            return "No need for OTP";
        }

        string[] statuses = result.Status.Split(' ');

        string luckyNumber = statuses[3];
        DateTime timeSinceCreated = DateTime.Parse(statuses[4] + ' ' + statuses[5]);
        if (timeSinceCreated.AddMinutes(10) <= DateTime.Now)
        {
            return "OTP password has expired";
        }

        if (luckyNumber != info.Password)
        {
            return "OTP Code is incorrect";
        }

        result.Status = "Normal";
        result.IsActive = true;
        await base.UpdateAsync(result);
        return "OTP verify successfully";
    }
}
