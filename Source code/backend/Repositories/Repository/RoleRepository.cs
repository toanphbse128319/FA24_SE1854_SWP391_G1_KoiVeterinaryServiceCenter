#nullable disable
using Repositories.Model;
namespace Repositories.Repository;

public class RoleRepository : GenericRepository<Role> {

    public RoleRepository( Context context )
        : base( context ){
    }

    public string getRoleName( string id ){
        return _context.Roles.FirstOrDefault( role => role.RoleId == id ).RoleName;
    }

}
