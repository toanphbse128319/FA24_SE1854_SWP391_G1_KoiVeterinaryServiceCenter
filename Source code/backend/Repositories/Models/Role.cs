namespace Repositories.Models;

public class Role
{
    private string _roleID;

    private string _roleName;

    public Role(string RoleID, string RoleName)
    {
        _roleID = RoleID;
        _roleName = RoleName;
    }

    public string RoleId { get; set; }

    public string RoleName { get; set; }
}