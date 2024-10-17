#nullable disable
namespace Helper;

public class UpdateSchedule
{
    public string ScheduleID { get; set; }
    public string EmployeeID { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateOnly Date { get; set; }
    public int Slot { get; set; }
    public int SlotCapacity { get; set; }
    public string SlotStatus { get; set; }
    public string Note { get; set; }
}
