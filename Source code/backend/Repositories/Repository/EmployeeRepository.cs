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
