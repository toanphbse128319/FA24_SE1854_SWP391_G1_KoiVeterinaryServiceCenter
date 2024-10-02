#nullable disable
namespace Helper;

public class LoginInformation{
    public string Info { get; set; }
    public string Password { get; set; }

    public bool IsEmpty(){
        if ( Info == null || Password == null )
            return true;
        if ( Info.Trim() == "" || Password.Trim() == "" )
            return true;
        return false;
    }
}
