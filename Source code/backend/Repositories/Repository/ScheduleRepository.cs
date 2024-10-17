using Microsoft.EntityFrameworkCore;
using Repositories.Model;

namespace Repositories.Repository;

public class ScheduleRepository : GenericRepository<Schedule>
{
    public ScheduleRepository(Context context)
    {
        _context = context;
    }

    public async Task<List<Schedule>> SearchByEmpIDAsync(string id)
    {
        return await _context.Schedules.Where(schedule => schedule.EmployeeID.ToLower() == id.ToLower()).ToListAsync()!;
    }

    public async Task<List<Schedule>> SearchByNameAsync(string firstname, string lastname)
    {
        Employee? emp = await (new EmployeeRepository(_context).SearchByFullNameAsync(firstname, lastname));
        if (emp == null)
            return null!;
        return await SearchByEmpIDAsync(emp.EmployeeID);
    }

    public async Task<Schedule?> CheckValidDateAsync(DateOnly date, string empID)
    {
        return await _context.Schedules.FirstOrDefaultAsync(schedule => schedule.Date == date &&
                                                                        schedule.EmployeeID == empID);
    }

    public async Task<Schedule?> CheckValidNameAsync(string firstname, string lastname)
    {
        Employee? emp = await (new EmployeeRepository(_context).SearchByFullNameAsync(firstname, lastname));
        if (emp == null)
            return null!;
        return (await SearchByEmpIDAsync(emp.EmployeeID))[0];
    }

    public async Task<List<Schedule>> SearchByDateAsync(DateOnly date, string empID)
    {
        return await _context.Schedules.Where(schedule => schedule.Date == date).ToListAsync();
    }

    public async Task<List<Schedule>> SearchVetAndDateAsync(DateOnly date, string empID)
    {
        return await _context.Schedules.Where(schedule => schedule.Date == date &&
                                                          schedule.EmployeeID == empID).ToListAsync();
    }

    public async Task<List<Schedule>> UpdateVetScheduleAsync(DateOnly date, string oldEmpID, string newEmpID)
    {
        List<Schedule> schedule = await SearchByDateAsync(date, oldEmpID);
        for (int i = 0; i < schedule.Count; ++i)
        {
            schedule[i].EmployeeID = newEmpID;
            await UpdateAsync(schedule[i]);
        }
        return schedule;
    }

    public async Task<Schedule> AddNewSchedule(DateOnly date, Schedule info)
    {
        if (info.ScheduleID == "")
            info.ScheduleID = "SCH" + base.GetAll().Count;
        await base.CreateAsync(info);
        return info;
    }
}

