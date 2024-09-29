namespace Models;

public class Account{

    private string _accountID;
    private string _email;
    private string _roleID;
    private string _avatar;
    private string _password;
    private string _status;
    private bool _isActive;

    public Account( string Account, String Email, String roleID, String Avatar, String Password, String Status, bool IsActive ){
        _accountID = Account;
        _email = Email;
        _roleID = roleID;
        _avatar = Avatar;
        _password = Password;
        _status = Status;
        _isActive = IsActive;
    }

    public String Account{ get; set; }
    

}

