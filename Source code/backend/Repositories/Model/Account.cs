#nullable disable
using System.ComponentModel.DataAnnotations.Schema;
namespace Repositories.Model;

// Tên table từ dababase ghi ở đây
[Table("Account")]
public class Account
{

    public string AccountID { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public string RoleID { get; set; }
    public string Avatar { get; set; }
    public string Password { get; set; }
    public string Status { get; set; }
    public bool IsActive { get; set; }

    //I'm not going to use Icollection for customer and employee here because each account only 
    //tied either an employee or a customer, AND NOT MORE.
}

