using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Repositories.Model;

namespace Repositories.Repository
{
    public class EmployeeRepository : GenericRepository<AnimalType>
    {
        public EmployeeRepository(Context context)
        {
            _context = context;
        }

        public Task<Employee?> FindEmpByIdAsync(string id)
        {
            return _context.Employees.FirstOrDefaultAsync(employee => employee.EmployeeID == id)!;
        }
    }
}
