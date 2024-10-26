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
        Employee? emp = await new EmployeeRepository(_context).SearchByFullNameAsync(firstname, lastname);
        if (emp == null)
            return null!;
        return await SearchByEmpIDAsync(emp.EmployeeID);
    }

    public async Task<Schedule?> CheckValidDateAsync(DateOnly date, string empID)
    {
        return await _context.Schedules.FirstOrDefaultAsync(schedule => schedule.Date == date &&
                                                                        schedule.EmployeeID == empID);
    }

    public async Task<Schedule?> CheckValidScheduleAsync(DateOnly date)
    {
        return await _context.Schedules.FirstOrDefaultAsync(schedule => schedule.Date == date);
    }

    public async Task<Schedule?> CheckValidNameAsync(string firstname, string lastname)
    {
        Employee? emp = await new EmployeeRepository(_context).SearchByFullNameAsync(firstname, lastname);
        if (emp == null)
            return null!;
        return (await SearchByEmpIDAsync(emp.EmployeeID))[0];
    }

    public async Task<List<Schedule>> SearchByDateAsync(DateOnly date)
    {
        return await _context.Schedules.Where(schedule => schedule.Date == date).ToListAsync();
    }

    public async Task<Schedule?> SearchVetAndDateAsync(DateOnly date, string EmpID)
    {
        return await _context.Schedules.FirstOrDefaultAsync(schedule => schedule.Date == date &&
                                                                        schedule.EmployeeID == EmpID);
    }

    public async Task<List<Schedule>> Get30DaysSchedule( DateOnly date ){
        return await _context.Schedules.Where( schedule => schedule.Date >= date &&
                                                           schedule.Date <= date.AddDays(30) ).ToListAsync();
    }

    public async Task<Schedule> UpdateVetScheduleAsync(DateOnly date, string oldEmpID, string newEmpID)
    {
        Schedule? sch = await _context.Schedules.FirstOrDefaultAsync(schedule => schedule.Date == date &&
                                                                           schedule.EmployeeID == oldEmpID);
        if (sch == null)
            return null!;
        sch.EmployeeID = newEmpID;
        await UpdateAsync(sch);
        
        return sch;
    }

    public async Task<Schedule> AddNewSchedule(Schedule info)
    {
        Schedule schedule = new Schedule();
        schedule.ScheduleID = GetNextID("SCH");
        schedule.EmployeeID = info.EmployeeID;
        schedule.Date = info.Date;
        schedule.Note = info.Note;
        schedule.Status = info.Status;
        await base.CreateAsync(schedule);
        await (new SlotTableRepository(_context).GenerateVetScheduleAsync(schedule.ScheduleID));
        return schedule;
    }

}

