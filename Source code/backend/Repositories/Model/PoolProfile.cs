namespace Repositories.Model;

public class PoolProfile
{
    private String _poolProfileID;
    private String _name;
    private String _bookingDetailID;
    private String? _note;
    private float _width;
    private String? _description;
    private float _height;  
    private float _depth;
    private String? _picture;

    public PoolProfile(string PoolProfileID, string Name, string BookingDetailID, string? Note, float Width, string? Description, float Height, float Depth, string? Picture)
    {
        _poolProfileID = PoolProfileID;
        _name = Name;
        _bookingDetailID = BookingDetailID;
        _note = Note;
        _width = Width;
        _description = Description;
        _height = Height;
        _depth = Depth;
        _picture = Picture;
    }

    public string PoolProfileID { get; set; }

    public string Name { get; set; }

    public string BookingDetailID { get; set; }

    public string Note { get; set; }

    public double Width { get; set; }

    public string Description { get; set; }

    public double Height { get; set; }

    public double Depth { get; set; }

    public string Picture { get; set; }
}