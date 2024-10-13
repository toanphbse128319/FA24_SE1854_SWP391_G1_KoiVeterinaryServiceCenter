using Helper;
using Microsoft.AspNetCore.Mvc;
using Repositories;
using Repositories.Model;

namespace API.Controllers;
[Route("api/[controller]")]
[ApiController]

public class ScheduleController : ControllerBase
{
    private UnitOfWork _unitOfWork;

    public ScheduleController(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpPost]

    [HttpPut]
    public async Task<ActionResult<Schedule>> UpdateSlotStatusAsync(Schedule info)
    {
        try
        {
            var schedule = await _unitOfWork.ScheduleRepository.UpdateSlotStatusAsync(info.Date, info.SlotStatus);
            if (schedule == null)
                return NotFound("Booking is not found!");
            if (info.SlotStatus == "true")
                return Ok("The Slot is available!");
            return Ok("The Slot is not available!");
        }
        catch (Exception ex)
        {
            return BadRequest("Unknown Error: " + ex.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Schedule?>> GetScheduleByDate(string date)
    {
        return await _unitOfWork.ScheduleRepository.FindScheduleByDateAsync(date);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Booking>>> GetVetBookings(String id)
    {
        try
        {
            if (await _unitOfWork.EmployeeRepository.FindEmpByIdAsync(id) == null)
                return BadRequest("EmployeeID is not existed!");
            List<Booking> list = await _unitOfWork.BookingRepository.GetVetBookingsAsync(id);
            if (list.Count == 0)
                return NotFound("Vet schedule is empty!");
            return list;
        }
        catch (Exception ex)
        {
            return BadRequest("Unknown Error: " + ex.Message);
        }
    }
}