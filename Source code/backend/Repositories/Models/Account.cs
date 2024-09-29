namespace Repositories.Models;

public class Account{

    private string _accountID;
    private string _email;
    private string _roleID;
    private string _avatar;
    private string _password;
    private string _status;
    private bool _isActive;

    public Account( string AccountID, String Email, String RoleID, String Avatar, String Password, String Status, bool IsActive ){
        _accountID = AccountID;
        _email = Email;
        _roleID = RoleID;
        _avatar = Avatar;
        _password = Password;
        _status = Status;
        _isActive = IsActive;
    }

    public String AccountID{ get; set; }
    public String Email{ get; set; }
    public String RoleID{ get; set; }
    public String Avartar{ get; set; }
    public String Password{ get; set; }
    public String Status{ get; set; }
    public bool IsActive{ get; set; }
    

}

