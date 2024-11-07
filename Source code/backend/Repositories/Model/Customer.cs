#nullable disable
using System.ComponentModel.DataAnnotations.Schema;
namespace Repositories.Model;

[Table("Customer")]
public class Customer
{

    public string CustomerID { get; set; }
    public string AccountID { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public bool Sex { get; set; }
    public DateOnly BirthDay { get; set; }
    public string Address { get; set; }
    public string Status { get; set; }

}
public class UpdateCustomerInformation
{
    public string Id { get; set; } // Customer ID
    public string Address { get; set; } // New Address
    public DateOnly DOB { get; set; } // New Date of Birth
    public bool Gender { get; set; } // Gender (true for Male, false for Female)
}

