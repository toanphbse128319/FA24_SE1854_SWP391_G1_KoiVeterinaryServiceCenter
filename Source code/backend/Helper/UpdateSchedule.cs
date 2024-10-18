#nullable disable
namespace Helper;

public class UpdateSchedule
{
    public string ScheduleID { get; set; }
    public string EmployeeID { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateOnly Date { get; set; }
    public string Status { get; set; }
    public int Slot { get; set; }
    public int SlotOrdered { get; set; }
    public int SlotCapacity { get; set; }
    public bool SlotStatus { get; set; }
    public string Note { get; set; }
    public string SlotNote { get; set; }
}
