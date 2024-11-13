using Microsoft.EntityFrameworkCore;
using Repositories.Model;
using System.Reflection.Metadata.Ecma335;

namespace Repositories.Repository;

public class SlotTableRepository : GenericRepository<SlotTable>
{
    public SlotTableRepository(Context context) => _context = context;

    public async Task<List<SlotTable>> SearchByScheduleIDAsync(string id)
    {
        return await _context.SlotTables.Where(slottable => slottable.ScheduleID.ToLower() == id.ToLower()).ToListAsync()!;
    }
    public async Task<SlotTable?> SearchSpecificSlotAsync(string scheduleID, int slotInfo, string note)
    {
        return await _context.SlotTables.FirstOrDefaultAsync(slot => slot.ScheduleID == scheduleID &&
                                                                     slot.Slot == slotInfo &&
                                                                     note.ToLower().Contains(slot.Note.ToLower()));
    }

    public int SlotByTime(int hour)
    {
        if (hour <= 6 || hour >= 18)
        {
            return 0;
        }
        switch (hour)
        {
            case 7: return 1;
            case 8: return 2;
            case 9: return 3;
            case 10: return 4;
            case 13: return 5;
            case 14: return 6;
            case 15: return 7;
            case 16: return 8;
            default: return 0;
        }
    }

    public async Task<SlotTable?> UpdateSlotInformationAsync(SlotTable info)
    {
        SlotTable? slot = await SearchSpecificSlotAsync(info.ScheduleID, info.Slot, info.Note);
        if (slot == null)
            return slot;
        if (info.Note != null)
            info.Note.ToLower().Contains(slot.Note.ToLower());
        if (slot.SlotOrdered > info.SlotCapacity)
            return null;
            slot.SlotOrdered = info.SlotOrdered;
        if (info.SlotCapacity != 0)
            slot.SlotCapacity = info.SlotCapacity;
        slot.SlotCapacity = info.SlotCapacity;
        await UpdateAsync(slot);
        return slot;
    }

    public async Task<SlotTable> OrderSlotAsync(int num, string scheduleID, string note)
    {
        SlotTable? slot = await SearchSpecificSlotAsync(scheduleID, num, note);
        if (slot == null)
            return null!;
        if (note.ToLower().Contains(slot.Note.ToLower()) == false)
            return null!;
        if (slot.SlotStatus == true)
        {
            if (note.ToLower().Contains("Tại nhà".ToLower()))
            {
                slot.SlotOrdered = slot.SlotCapacity;
                slot.SlotStatus = false;
                return slot;
            }
                
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

    public async Task<int?> GenerateVetScheduleAsync(string scheduleID, string note)
    {
        for (int i = 0; i < 8; i++)
        {
            SlotTable slot = new()
            {
                SlotTableID = GetNextID("ST"),
                ScheduleID = scheduleID,
                Slot = (i + 1),
                SlotStatus = true,
                Note = note,
                SlotCapacity = 5
            };
            await base.CreateAsync(slot);
        }
        return 0;
    }
}
