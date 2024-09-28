using System.ComponentModel.DataAnnotations;

namespace Repositories.Models;

public class Customer{
    private string _id;
    private string _email;
    private string _roleId;
    private string _phoneNumber;
    private string? _firstName;
    private string? _lastName;
//  private int _sex;
    private DateOnly _birthday;
//  private string _avatar;
    private string _address;
    private string _password;
//  private string _status;
//  private string _picture;

    public string Id {
        get { return _id; }
        set { _id = value; }
    }

    public string Email {
        get { return _email; }
        set { _email = value; }
    }
    
    public string RoleId {
        get { return _roleId; }
        set { _roleId = value; }
    }

    public string PhoneNumber {
        get { return _phoneNumber; }
        set { _phoneNumber = value; }
    }
    
//    public string? FirstName {
//        get { return _firstName; }
//        set { _firstName = value; }
//    }

    public DateOnly BirthDay {
        get { return _birthday; }
        set { _birthday = value; }
    }

    public string Address {
        get { return _address; }
        set { _address = value; }
    }

    public string Password {
        get { return _password; }
        set { _password = value; }
    }

}
