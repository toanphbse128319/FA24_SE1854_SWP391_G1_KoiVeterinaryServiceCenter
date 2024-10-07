using System.ComponentModel.DataAnnotations.Schema;

namespace Repositories.Model;

[Table("AnimalProfile")]
public class AnimalProfile
{
    public string AnimalProfileID { get; set; }
    public string Name { get; set; }
    public string TypeID { get; set; }
    public string BookingDetailID { get; set; }
    public double Size { get; set; }
    public int Age { get; set; }
    public string Color { get; set; }
    public string Description { get; set; }
    public int Sex { get; set; }
    public string Picture { get; set; } 
}
