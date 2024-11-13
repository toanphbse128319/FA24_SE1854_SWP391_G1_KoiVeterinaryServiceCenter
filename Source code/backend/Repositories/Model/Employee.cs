#nullable disable
using System.ComponentModel.DataAnnotations.Schema;
namespace Repositories.Model;

[Table("Employee")]
public class Employee
{

    public string EmployeeID { get; set; }
    public string AccountID { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public bool Sex { get; set; }
    public DateOnly BirthDay { get; set; }
    public string Address { get; set; }
    public string Status { get; set; }

}
