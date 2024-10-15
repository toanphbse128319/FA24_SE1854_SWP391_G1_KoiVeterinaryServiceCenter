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
        if( emp == null )
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
        if( emp == null )
            return null!;
        return (await SearchByEmpIDAsync(emp.EmployeeID))[0];
    }

    public async Task<List<Schedule>> SearchByDateAsync(DateOnly date, string empID)
    { 
        return await _context.Schedules.Where(schedule => schedule.Date == date &&
                                                    schedule.SlotStatus == true).ToListAsync();
    }

    public async Task<Schedule?> SearchSpecificSlotAsync(string employeeID, DateOnly date, int slot){
        return await _context.Schedules.FirstOrDefaultAsync(schedule => schedule.Date == date &&
                                                                  schedule.Slot == slot &&
                                                                  schedule.EmployeeID == employeeID);
    }

    public async Task<Schedule?> UpdateSlotStatusAsync(Schedule info)
    {
        Schedule? schedule = await SearchSpecificSlotAsync(info.EmployeeID, info.Date, info.Slot);
        if (schedule == null) 
            return schedule;

        schedule.SlotCapacity = info.SlotCapacity;
        schedule.SlotStatus = info.SlotStatus;
        await UpdateAsync(schedule);
        return schedule;
    }

    public async Task<List<Schedule>> UpdateVetScheduleAsync(DateOnly date, string oldEmpID, string newEmpID)
    {
        List<Schedule> schedule = await SearchByDateAsync(date, oldEmpID);
        for( int i = 0; i < schedule.Count; ++i ){
            schedule[i].EmployeeID = newEmpID;
            await UpdateAsync(schedule[i]);
        }
        return schedule;
    }

    public async Task<Schedule?> GenerateVetScheduleAsync(Schedule info)
    {
        int index = base.GetAll().Count;
        if (info.ScheduleID == "")
            info.ScheduleID = "SCH" ;

        for (int i = 0; i < 8; i++)
        {
            Schedule schedule = new Schedule();
            schedule.ScheduleID = info.ScheduleID + (index + i);
            schedule.EmployeeID = info.EmployeeID;
            schedule.Date = info.Date;  
            schedule.Note = info.Note;
            schedule.Slot = (i + 1);
            schedule.SlotStatus = info.SlotStatus;
            await base.CreateAsync(schedule);
        }
        return info;
    }
}

