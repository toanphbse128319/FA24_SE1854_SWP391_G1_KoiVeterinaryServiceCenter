using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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

    }
}
