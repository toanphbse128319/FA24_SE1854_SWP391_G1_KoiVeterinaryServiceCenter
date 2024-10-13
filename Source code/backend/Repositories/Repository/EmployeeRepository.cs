#nullable disable
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

        public async Task<Employee> SearchByAccountID(string id){
            return await _context.Employees.FirstOrDefaultAsync( customer => customer.AccountID == id);
        }

    }
}
