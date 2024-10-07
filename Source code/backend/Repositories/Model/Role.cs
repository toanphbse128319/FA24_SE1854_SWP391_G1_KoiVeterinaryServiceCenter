#nullable disable
using System.ComponentModel.DataAnnotations.Schema;

namespace Repositories.Model;
[Table("Role")]
public class Role
{

    public string RoleId { get; set; }
    public string RoleName { get; set; }

}
