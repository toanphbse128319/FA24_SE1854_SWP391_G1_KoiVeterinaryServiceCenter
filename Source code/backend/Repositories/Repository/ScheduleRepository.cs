﻿using Microsoft.EntityFrameworkCore;
using Repositories.Model;

namespace Repositories.Repository;

public class ScheduleRepository : GenericRepository<Schedule>
{
    public ScheduleRepository(Context context)
    {
        _context = context;
    }

    public Task<Schedule?> FindScheduleByEmpIDAsync(string id)
    {
        return _context.Schedules.FirstOrDefaultAsync(schedule => schedule.EmployeeID.ToLower() == id.ToLower());
    }

    public Task<List<Schedule>> FindScheduleByNameAsync(string firstname, string lastname)
    {
        return _context.Schedules.Where(schedule => schedule.FirstName.ToLower() == firstname.ToLower() &&
                                                    schedule.LastName.ToLower() == lastname.ToLower()).ToListAsync();
    }

    public Task<Schedule?> CheckValidDate(DateOnly date)
    {
        return _context.Schedules.FirstOrDefaultAsync(schedule => schedule.Date == date);
    }

    public Task<Schedule?> CheckValidName(string firstname, string lastname)
    {
        return _context.Schedules.FirstOrDefaultAsync(schedule => schedule.FirstName == firstname &&
                                                                  schedule.LastName == lastname);
    }

    public Task<List<Schedule>> FindScheduleByDateAsync(DateOnly date)
    { 
        return _context.Schedules.Where(schedule => schedule.Date == date &&
                                                    schedule.SlotStatus == true).ToListAsync();
    }

    public async Task<Schedule?> UpdateSlotStatusAsync(string id, bool msg)
    {
        Schedule? schedule = await FindScheduleByEmpIDAsync(id);
        if (schedule == null) 
            return schedule;
        else
        {
            schedule.SlotStatus = msg;
            await UpdateAsync(schedule);
            return schedule;
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

