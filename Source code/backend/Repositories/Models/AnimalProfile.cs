namespace Repositories.Models;

public class AnimalProfile
{
    private String _animalProfileID;
    private String _name;
    private String _typeID;
    private String _bookingDetailID;
    private String _size;
    private String _age;
    private String _color;
    private String? _description;
    private bool _sex;
    private String? _picture;

    public AnimalProfile(string AnimalProfileID, string Name, string TypeID, string BookingDetailID, string Size, string Age, string Color, string? Description, bool Sex, string? Picture)
    {
        _animalProfileID = AnimalProfileID;
        _name = Name;
        _typeID = TypeID;
        _bookingDetailID = BookingDetailID;
        _size = Size;
        _age = Age;
        _color = Color;
        _description = Description;
        _sex = Sex;
        _picture = Picture;
    }

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