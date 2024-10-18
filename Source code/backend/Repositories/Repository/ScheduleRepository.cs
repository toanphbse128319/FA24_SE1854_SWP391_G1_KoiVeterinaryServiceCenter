using Helper;
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

    public async Task<Schedule?> SearchVetAndDateAsync(DateOnly date, string firstName, string lastName)
    {
        Employee? emp = await new EmployeeRepository(_context).SearchByFullNameAsync(firstName, lastName);
        if (emp == null)
            return null!;
        return await _context.Schedules.FirstOrDefaultAsync(schedule => schedule.Date == date &&
                                                                        schedule.EmployeeID == emp.EmployeeID);
    }

    public async Task<Schedule> UpdateVetScheduleAsync(DateOnly date, string oldFirstName, 
                                                                            string oldLastName, 
                                                                            string newFirstName, 
                                                                            string newLastName)
    {
        Schedule? schedule = await SearchVetAndDateAsync(date, oldFirstName, oldLastName);
        Employee? newEmpID = await new EmployeeRepository(_context).SearchByFullNameAsync(newFirstName, newLastName);
        if (newEmpID == null || schedule == null)
            return null!;
        schedule.EmployeeID = newEmpID.EmployeeID;
        await UpdateAsync(schedule);
        
        return schedule;
    }

    public async Task<Schedule> AddNewSchedule(UpdateSchedule info)
    {
        Schedule schedule = new Schedule();
        schedule.EmployeeID = info.EmployeeID;
        schedule.Date = info.Date;
        schedule.Note = info.Note;
        schedule.Status = info.Status;
        if (schedule.ScheduleID == null || schedule.ScheduleID == "")
            schedule.ScheduleID = "SCH" + base.GetAll().Count;
        await base.CreateAsync(schedule);
        await (new SlotTableRepository(_context).GenerateVetScheduleAsync(info.ScheduleID));
        return schedule;
    }

}

