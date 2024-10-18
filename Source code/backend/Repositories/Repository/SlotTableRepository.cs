using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Repositories.Model;
using System.Runtime.InteropServices;

namespace Repositories.Repository;

public class SlotTableRepository : GenericRepository<SlotTable>
{
    public SlotTableRepository(Context context) => _context = context;

    public async Task<List<SlotTable>> SearchByScheduleIDAsync(string id)
    {
        return await _context.SlotTables.Where(slottable => slottable.ScheduleID.ToLower() == id.ToLower()).ToListAsync()!;
    }
    public async Task<SlotTable?> SearchSpecificSlotAsync(string scheduleID, int slotInfo)
    {
        return await _context.SlotTables.FirstOrDefaultAsync(slot => slot.ScheduleID == scheduleID &&
                                                                     slot.Slot == slotInfo);
    }

    public async Task<SlotTable?> UpdateSlotInformationAsync(SlotTable info)    
    {
        SlotTable? slot = await SearchSpecificSlotAsync(info.ScheduleID, info.Slot);
        if (slot == null)
            return slot;

        slot.Note = info.Note;
        slot.SlotCapacity = info.SlotCapacity;
        await UpdateAsync(slot);
        return slot;
    }

    public async Task<SlotTable> OrderSlot(int num, string scheduleID)
    {
        SlotTable? slot = await SearchSpecificSlotAsync(scheduleID, num);
        if (slot == null)
            return null!;
        if (slot.SlotStatus == true)
        {
            if (slot.SlotOrdered == slot.SlotCapacity)
            {
                slot.SlotStatus = false;
                return slot;
            }
            slot.SlotOrdered++;
            await UpdateAsync(slot);
        }
        return slot;
    }

    public async Task<int?> GenerateVetScheduleAsync(string scheduleID)
    {
        int index = base.GetAll().Count;
        
        for (int i = 0; i < 8; i++)
        {
            SlotTable slot = new()
            {
                SlotID = "ST" + (index + i),
                ScheduleID = scheduleID,
                Slot = (i + 1),
                SlotStatus = true
            };
            await base.CreateAsync(slot);
        }
        return 0;
    }
}
