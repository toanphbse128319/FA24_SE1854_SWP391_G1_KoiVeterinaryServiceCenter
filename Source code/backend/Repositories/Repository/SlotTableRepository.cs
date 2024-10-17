using Microsoft.EntityFrameworkCore;
using Repositories.Model;

namespace Repositories.Repository;

public class SlotTableRepository : GenericRepository<SlotTable>
{
    public SlotTableRepository(Context context) => _context = context;

    public async Task<List<SlotTable>> SearchBySlotIDAsync(string id)
    {
        return await _context.SlotTables.Where(slottable => slottable.ScheduleID.ToLower() == id.ToLower()).ToListAsync()!;
    }
    public async Task<SlotTable?> SearchSpecificSlotAsync(string scheduleID, int slotInfo)
    {
        return await _context.SlotTables.FirstOrDefaultAsync(slot => slot.ScheduleID == scheduleID &&
                                                                     slot.Slot == slotInfo);
    }

    public async Task<SlotTable?> UpdateSlotAsync(SlotTable info)
    {
        SlotTable? slot = await SearchSpecificSlotAsync(info.ScheduleID, info.Slot);
        if (slot == null)
            return slot;

        slot.Note = info.Note;
        slot.SlotCapacity = info.SlotCapacity;
        slot.SlotStatus = info.SlotStatus;
        await UpdateAsync(slot);
        return slot;
    }

    public async Task<int?> GenerateVetScheduleAsync(string scheduleID)
    {
        int index = base.GetAll().Count;
        
        for (int i = 0; i < 8; i++)
        {
            SlotTable slot = new SlotTable();
            slot.SlotID = "ST" + (index + i);
            slot.ScheduleID = scheduleID;
            slot.Slot = (i + 1);
            slot.SlotStatus = "available";
            await base.CreateAsync(slot);
        }
        return 0;
    }
}
