#nullable disable
using System.ComponentModel.DataAnnotations.Schema;
namespace Repositories.Model;

[Table("Schedule")]
public class Schedule
{   
    public string ScheduleID { get; set; }
    public string EmployeeID { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Date { get; set; }
    public string Note { get; set; }
    public int Slot { get; set; }
    public int SlotCapacity { get; set; }
    public bool SlotStatus { get; set; }

}

