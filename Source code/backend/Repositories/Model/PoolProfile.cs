#nullable disable
using System.ComponentModel.DataAnnotations.Schema;

namespace Repositories.Model;
[Table("PoolProfile")]
public class PoolProfile
{
    public string PoolProfileID { get; set; }

    public string Name { get; set; }

    public string Note { get; set; }

    public double Width { get; set; }

    public string Description { get; set; }

    public double Height { get; set; }

    public double Depth { get; set; }

    public string Picture { get; set; }
}