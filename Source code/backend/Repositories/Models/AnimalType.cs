namespace Repositories.Models;

public class AnimalType
{
    private String _typeID;
    private String _name;

    public AnimalType(string TypeID, string Name)
    {
        _typeID = TypeID;
        _name = Name;
    }

    public string TypeID { get; set; }

    public string Name { get; set; }

}