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
        return _context.Schedules.FirstOrDefaultAsync(schedule => schedule.EmployeeID.ToLower() == id.ToLower());
    }

    public Task<Schedule?> FindScheduleByDateAsync(string date)
    {
        return _context.Schedules.FirstOrDefaultAsync(schedule => schedule.Date == date);
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

    public async Task<Schedule?> UpdateVetScheduleAsync(string date, string name)
    {
        Schedule schedule = await FindScheduleByDateAsync(date);
        if (schedule == null)
            return schedule;
        else
        {
            schedule.EmployeeID = name;
            await _context.SaveChangesAsync();
            return schedule;
        }
    }

    public async Task<Schedule?> GenerateVetScheduleAsync(Schedule info)
    {
        int index = base.GetAll().Count;
        if (info.ScheduleID == "")
            info.ScheduleID = "SCH" + index;
            
        try
        {   
            for (int i = 0; i < 8; i++)
            {
                Schedule schedule = new Schedule();

                schedule.ScheduleID = "VS" + (index + i);
                schedule.EmployeeID = info.EmployeeID;
                schedule.Date = info.Date;  
                schedule.Note = info.Note;
                schedule.Slot = "" + (i + 1);
                schedule.SlotStatus = info.SlotStatus;

                await base.CreateAsync(schedule);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
        }
        return info;
    }
}

