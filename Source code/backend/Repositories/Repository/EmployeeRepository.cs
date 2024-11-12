using Microsoft.EntityFrameworkCore;
using Repositories.Model;

namespace Repositories.Repository
{
    public class EmployeeRepository : GenericRepository<Employee>
    {

        public EmployeeRepository(Context context)
        {
            _context = context;
        }

        public async Task<Employee?> SearchByAccountIDAsync(string id)
        {
            return await _context.Employees.FirstOrDefaultAsync(employee => employee.AccountID == id);
        }

        public Employee? SearchByAccountID(string id)
        {
            return _context.Employees.FirstOrDefault(employee => employee.AccountID == id);
        }

        public async Task<Employee?> SearchByFullNameAsync(string firstname, string lastname)
        {
            return await _context.Employees.FirstOrDefaultAsync(employee => employee.FirstName == firstname &&
                                                                       employee.LastName == lastname);
        }

        public string checkValid( Employee info ){
            if( string.IsNullOrEmpty(info.LastName) )
                return "Invalid: missing lastname";
            if( string.IsNullOrEmpty( info.FirstName ) )
                return "Invalid: missing firstname";
            if( string.IsNullOrEmpty( info.Address ) )
                return "Invalid: missing addressc";
            if( string.IsNullOrEmpty( info.Status ) )
                return "Invalid: missing status";
            if( string.IsNullOrEmpty( info.RoleID ) )
                return "Invalid: missing role";
            return "Ok";
        }

        public async Task<string> UpdateEmployeeAsync( Employee info ){
            string result = "";
            result = checkValid( info );
            if( result != "Ok" )
                return result;
            if( string.IsNullOrEmpty( info.EmployeeID ) )
                return "Invalid: missing info";
            if( await base.UpdateAsync( info ) < 1 )
                return "Invalid: failed to update";
            return "Ok";
        }

        public async Task<string> CreateEmployeeAsync( Employee info ){
            string result = "";
            result = checkValid( info );
            if( result != "Ok" )
                return result;
            info.EmployeeID = base.GetNextID("E");
            if( await base.CreateAsync( info ) < 1 )
                return "Invalid: failed to update";
            return "Ok";
        }

        public async Task<string> UpdateOrAddAsync( Employee info ){
            if( string.IsNullOrEmpty( info.EmployeeID ) )
                return await CreateEmployeeAsync( info );
            return await UpdateEmployeeAsync( info );
        }

        public async Task<List<Employee?>> SearchByRoleName( string rolename ){
            string role = (new RoleRepository( _context )).getRoleID( rolename );
            if( role == "" )
                return new List<Employee?>();
            List<Employee?> list = (await _context.Employees.Where( employee => employee.RoleID == role ).ToListAsync())!;
            if( list == null )
                return new List<Employee?>();
            return list;
        }
    }
}
