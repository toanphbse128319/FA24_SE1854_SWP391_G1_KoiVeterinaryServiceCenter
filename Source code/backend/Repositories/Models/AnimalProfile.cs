namespace Repositories.Models;

public class AnimalProfile
{
    public string AnimalProfileID { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string TypeID { get; set; } = string.Empty;
    public string BookingDetailID { get; set; } = string.Empty;
    public double Size { get; set; }
    public int Age { get; set; }
    public string Color { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int Sex { get; set; }
    public string Picture { get; set; } = string.Empty;
}
