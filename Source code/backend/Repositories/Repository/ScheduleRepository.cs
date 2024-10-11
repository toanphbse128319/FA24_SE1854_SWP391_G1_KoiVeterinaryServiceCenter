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
    public Task<Schedule?> FindScheduleAsync(string id)
    {
        return _context.Schedules.FirstOrDefaultAsync(schedule => schedule.ScheduleID.ToLower() == id.ToLower());
    }

    public Task<List<Schedule>> FindScheduleByDateAsync(string date)
    {
        return _context.Schedules.Where(schedule => schedule.Date == date).ToListAsync();
    }
    public Task<List<Schedule>> FindSlotAvailableAsync(string date) 
    { 
        return _context.Schedules.Where(schedule => schedule.Date == date &&
                                                    schedule.SlotStatus == "true").ToListAsync();
    }

    public async Task<Schedule?> UpdateSlotStatusAsync(string id, string msg)
    {
        Schedule schedule = await FindScheduleAsync(id);
        if (schedule == null) 
            return schedule;
        else
        {
            schedule.SlotStatus = msg;
            await _context.SaveChangesAsync();
            return schedule;
        }
    }
}

