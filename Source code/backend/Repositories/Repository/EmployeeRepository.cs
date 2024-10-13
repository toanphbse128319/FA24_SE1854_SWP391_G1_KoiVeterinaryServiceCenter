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

        public async Task<Employee?> SearchByAccountIDAsync(string id){
            return await _context.Employees.FirstOrDefaultAsync( customer => customer.AccountID == id);
        }

        public Employee? SearchByAccountID(string id){
            return _context.Employees.FirstOrDefault( customer => customer.AccountID == id);
        }
    }
}
