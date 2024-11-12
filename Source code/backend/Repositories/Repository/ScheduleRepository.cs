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
    //public async Task<Schedule?> SearchByDateAndNoteAsync(DateOnly date, string note)
    //{
    //    if (await _context.Schedules.FirstOrDefaultAsync(schedule => schedule.Date == date &&
    //                                                                 schedule.Note == note) == null)
    //        return null!;
    //    return await _context.Schedules.FirstOrDefaultAsync(schedule => schedule.Date == date &&
    //                                                                    schedule.Note == note);
    //}

    //public async Task<string> ReturnEmpScheduleAvailableAsync(DateOnly date, string note)
    //{
    //    List<Schedule> sch = await _context.Schedules.Where(schedule => schedule.Date == date &&                     
    //                                                                    note.Contains(schedule.Note)).ToListAsync();

    //    SlotTable? st = await new SlotTableRepository(_context).SearchSpecificSlotAsync(note, 1);
    //}
  


    public async Task<Schedule?> CheckValidDateAsync(DateOnly date, string empID, string note, int slotNo)
    {
        if (note == "" || slotNo == 0)
            return null;
            if (empID == "E0")
        {
            List<Schedule> sch = await _context.Schedules.Where(schedule => schedule.Date == date &&
                                                                            note.Contains(schedule.Note)).ToListAsync();
            foreach (Schedule s in sch)
            {
                SlotTable? slot = await new SlotTableRepository(_context).SearchSpecificSlotAsync(s.ScheduleID, slotNo);
                if (slot == null)
                    return null;
                if (slot.SlotStatus == true)
                    return s;
            }
        }
        return await _context.Schedules.FirstOrDefaultAsync(schedule => schedule.Date == date &&
                                                                        schedule.EmployeeID == empID &&
                                                                        note.Contains(schedule.Note));
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

    public async Task<List<Schedule>> Get30DaysScheduleAsync( DateOnly date ){
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

    //Reduct redundadncy
    public async Task<Schedule> AddNewScheduleAsync(Schedule info)
    {
        info.ScheduleID = GetNextID("SCH");
        await base.CreateAsync(info);
        await (new SlotTableRepository(_context).GenerateVetScheduleAsync(info.ScheduleID, info.Note));
        return info;
    }

    public async Task<List<SlotTable>> GetSlotIn30Days( DateOnly date ){
        List<Schedule> schedules = await Get30DaysScheduleAsync( date );
        List<SlotTable> slots = new List<SlotTable>();
        SlotTableRepository slotManager = new SlotTableRepository( _context );
        foreach( Schedule schedule in schedules ){
            slots.AddRange( await slotManager.SearchByScheduleIDAsync( schedule.ScheduleID ) );
        }
        return slots;
    }
}

