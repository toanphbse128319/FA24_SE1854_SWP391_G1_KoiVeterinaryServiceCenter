namespace Repositories.Models;

public class Customer{
    private string _id;
    private string _email;
    private string _phoneNumber;
    private string? _firstName;
    private string? _lastName;
    private bool _sex;
    private DateOnly _birthday;
    private string _avatar;
    private string _address;
    private string _accountID;
    private string _status;

    public Customer(string ID, string Email, string PhoneNumber, string FirstName, string LastName, bool sex, DateOnly BirthDay, string Avatar, string Address, string AccountID, string Status ){
        _id = ID;
        _email = Email;
        _phoneNumber = PhoneNumber;
        _firstName = FirstName;
        _lastName = LastName;
        _sex = sex;
        _birthday = BirthDay;
        _avatar = Avatar;
        _address = Address;
        _accountID = AccountID;
        _status = Status;
    }

    public string Id { get; set; }

    public string Email { get; set; }

    public string Lastname { get; set; }

    public string FirstName { get; set; }

    public string Avatar { get; set; }

    public string Address { get; set; }

    public string AccountID { get; set; }

    public string Status { get; set; }
}
