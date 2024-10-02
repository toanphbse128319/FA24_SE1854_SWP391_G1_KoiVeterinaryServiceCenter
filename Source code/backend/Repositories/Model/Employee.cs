using System.ComponentModel.DataAnnotations.Schema;
namespace Repositories.Model;

[Table("Employee")]
public class Employee
{

    public string EmployeeID { get; set; } = string.Empty;
    public string AccountID { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string Lastname { get; set; } = string.Empty;
    public bool Sex { get; set; }
    public DateOnly BirthDay { get; set; }
    public string Address { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;

}
