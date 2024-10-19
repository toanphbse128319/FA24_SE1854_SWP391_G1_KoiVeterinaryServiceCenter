#nullable disable

public class CustomerSignupInformation{
    public string Email{ get; set; }
    public string PhoneNumber{ get; set; }
    public string Password{ get; set; }
    public string Firstname{ get; set; }
    public string Lastname{ get; set; }
    public bool Sex{ get; set; }
    public DateOnly Birthday{ get; set; }
    public string Address{ get; set; }

    public string CheckNull(){
        if( Email == null )
            return "Email cannot be null";
        if( PhoneNumber == null )
            return "Phone number cannot be null";
        if( Password == null )
            return "Password cannot be null";
        if( Lastname == null )
            return "Lastname cannot be null";
        if( Address == null )
            return "Address cannot be null";
        return "Ok";
    }

    /// This will not return "Ok" if there is null or empty parameter
    public string CheckEmpty(){
        string result = CheckNull();
        if( result != "Ok" )
            return result;
        if( Email.Count()  == 0 )
            return "Email cannot be empty";
        if( PhoneNumber.Count() == 0 )
            return "Phone number cannot be empty";
        if( Password.Count() == 0 )
            return "Password cannot be empty";
        if( Lastname.Count() == 0 )
            return "Lastname cannot be empty";
        if( Address.Count() == 0 )
            return "Address cannot be empty";
        return "Ok";
    }
}
