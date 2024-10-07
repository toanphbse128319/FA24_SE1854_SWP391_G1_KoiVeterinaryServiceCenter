#nullable disable
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Repositories.Model;

[Table("AnimalType")]
public class AnimalType
{
    [Key]
    public string TypeID { get; set; }

    public string Name { get; set; }

}