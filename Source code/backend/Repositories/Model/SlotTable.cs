#nullable disable
using System.ComponentModel.DataAnnotations.Schema;
namespace Repositories.Model;

[Table("SlotTable")]
public class SlotTable
{
    public string SlotID { get; set; }
    public string ScheduleID { get; set; }
    public string Note { get; set; }
    public int Slot { get; set; }
    public int SlotOrdered { get; set; }
    public int SlotCapacity { get; set; }
    public bool SlotStatus {  get; set; }

}

