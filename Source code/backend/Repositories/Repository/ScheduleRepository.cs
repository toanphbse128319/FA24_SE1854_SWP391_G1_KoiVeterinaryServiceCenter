using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using Repositories.Model;
using Repositories;
using Repositories.Repository;

namespace Repositories.Repository;

public class ScheduleRepository : GenericRepository<Schedule>
{
    public ScheduleRepository(Context context)
    {
        _context = context;
    }
}

