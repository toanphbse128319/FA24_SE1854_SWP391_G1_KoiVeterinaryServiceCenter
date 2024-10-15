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

    public Task<Schedule?> CheckValidDate(DateOnly date)
    {
        return _context.Schedules.FirstOrDefaultAsync(schedule => schedule.Date == date);
    }

    public async Task<Schedule?> CheckValidName(string firstname, string lastname)
    {
        Employee? emp = await (new EmployeeRepository(_context).SearchByFullNameAsync(firstname, lastname));
        if( emp == null )
            return null!;
        return (await SearchByEmpIDAsync(emp.EmployeeID))[0];
    }

    public Task<List<Schedule>> FindScheduleByDateAsync(DateOnly date)
    { 
        return _context.Schedules.Where(schedule => schedule.Date == date &&
                                                    schedule.SlotStatus == true).ToListAsync();
    }

    public Task<Schedule?> FindSpecificSchedule(string employeeID, DateOnly date, int slot){
        return _context.Schedules.FirstOrDefaultAsync(schedule => schedule.Date == date &&
                                                                  schedule.Slot == slot &&
                                                                  schedule.EmployeeID == employeeID);
    }

    public async Task<Schedule?> UpdateSlotStatusAsync(Schedule info)
    {
        Schedule? schedule = await FindSpecificSchedule(info.EmployeeID, info.Date, info.Slot);
        if (schedule == null) 
            return schedule;
        else
        {
            await UpdateAsync(info);
            return info;
        }
    }

    public async Task<List<Schedule>> UpdateVetScheduleAsync(DateOnly date, string firstname, string lastname)
    {
        List<Schedule> schedule = await FindScheduleByDateAsync(date);
        try
        {
            foreach (var item in schedule)
            {
                item.FirstName = firstname;
                item.LastName = lastname;
                await UpdateAsync(item);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
        }
        return schedule;
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
                schedule.Slot = (i + 1);
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

