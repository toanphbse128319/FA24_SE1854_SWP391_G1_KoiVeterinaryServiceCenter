#nullable disable
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
    public async Task<ActionResult<Schedule>> AddScheduleAsync(Schedule info)
    {
        try
        {
            if (info.FirstName == null || info.LastName == null)
                return BadRequest("Missing parameter(s)!");
            if (info.Date == new DateOnly() || info.FirstName.Trim().Length == 0 || info.LastName.Trim().Length == 0)
                return BadRequest("Parameter(s) cannot be empty!");
            if (await _unitOfWork.ScheduleRepository.FindScheduleByDateAsync(info.Date) != null)
                return BadRequest("Date is already existed!");
            var schedule = await _unitOfWork.ScheduleRepository.GenerateVetScheduleAsync(info);
            return Ok("Added successfully!");
        }
        catch (Exception ex)
        {
            return BadRequest("Unknown Error: " + ex.Message);
        }
    }

    [Route("UpdateSlotStatus")]
    [HttpPut]
    public async Task<ActionResult<Schedule>> UpdateSlotStatusAsync(Schedule info)
    {
        try
        {
            var schedule = await _unitOfWork.ScheduleRepository.UpdateSlotStatusAsync(info);
            if (schedule == null)
                return NotFound("Date is not found!");
            if (info.SlotStatus == true)
                return Ok("The Slot Status changed to available!");
            return Ok("The Slot Status changed to not available!");
        }
        catch (Exception ex)
        {
            return BadRequest("Unknown Error: " + ex.Message);
        }
    }

    [Route("UpdateVetSchedule")]
    [HttpPut]
    public async Task<ActionResult<Schedule>> UpdateVetScheduleAsync(Schedule info)
    {
        try
        {
            var schedule = await _unitOfWork.ScheduleRepository.UpdateVetScheduleAsync(info.Date, info.FirstName, info.LastName);
            if (schedule == null)
                return NotFound("Date is not found!");
            return Ok(info.FirstName + " " + info.LastName + " is updated successfully!");
        }
        catch (Exception ex)
        {
            return BadRequest("Unknown Error: " + ex.Message);
        }
    }

    [Route("GetScheduleByDate")]
    [HttpGet]
    public async Task<ActionResult<List<Schedule>>> GetScheduleByDate(DateOnly date)
    {
        if (await _unitOfWork.ScheduleRepository.CheckValidDate(date) == null)
            return NotFound("Date is not found!");
        return await _unitOfWork.ScheduleRepository.FindScheduleByDateAsync(date);
    }

    [Route("GetScheduleByName")]
    [HttpGet]
    public async Task<ActionResult<List<Schedule>>> GetScheduleByName(string firstname, string lastname)
    {
        if (await _unitOfWork.ScheduleRepository.CheckValidName(firstname, lastname) == null)
            return NotFound("Name is not found!");
        return await _unitOfWork.ScheduleRepository.FindScheduleByNameAsync(firstname, lastname);
    }


    //[HttpGet]
    //public async Task<ActionResult<IEnumerable<Booking>>> GetVetBookings(String id)
    //{
    //    try
    //    {
    //        if (await _unitOfWork.EmployeeRepository.FindEmpByIdAsync(id) == null)
    //            return BadRequest("EmployeeID is not existed!");
    //        List<Booking> list = await _unitOfWork.BookingRepository.GetVetBookingsAsync(id);
    //        if (list.Count == 0)
    //            return NotFound("Vet schedule is empty!");
    //        return list;
    //    }
    //    catch (Exception ex)
    //    {
    //        return BadRequest("Unknown Error: " + ex.Message);
    //    }
    //}
}
