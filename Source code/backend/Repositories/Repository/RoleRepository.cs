#nullable disable
using Repositories.Model;
namespace Repositories.Repository;

public class RoleRepository : GenericRepository<Role>
{

    public RoleRepository(Context context)
        : base(context)
    {
    }

    public string getRoleName(string id)
    {
        Role role =  _context.Roles.FirstOrDefault(role => role.RoleId == id);
        if( role == null )
            return "";
        return role.RoleId;
    }

    public string getRoleID( string rolename ){
        Role role =  _context.Roles.FirstOrDefault(role => role.RoleName == rolename);
        if( role == null )
            return "";
        return role.RoleId;
               
    }

}
