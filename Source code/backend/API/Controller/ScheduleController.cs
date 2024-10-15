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
            if (info.EmployeeID == null )
                return BadRequest("Missing id parameter!");
            if (info.Date == new DateOnly() || info.EmployeeID.Trim().Length == 0)
                return BadRequest("Parameter(s) cannot be empty!");
            if (await _unitOfWork.ScheduleRepository.CheckValidDateAsync(info.Date, info.EmployeeID) != null)
                return BadRequest("Working day for that vet is already existed!");
            await _unitOfWork.ScheduleRepository.GenerateVetScheduleAsync(info);
            return Ok("Added successfully!");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [Route("UpdateSlot")]
    [HttpPut]
    public async Task<ActionResult<Schedule>> UpdateSlotStatusAsync(Schedule info)
    {
        try
        {
            var schedule = await _unitOfWork.ScheduleRepository.UpdateSlotAsync(info);
            if (schedule == null)
                return NotFound("Date is not found!");
            if (info.SlotStatus == true)
                return Ok("The Slot Status changed to available!");
            return Ok("The Slot Status changed to not available!");
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [Route("UpdateVetSchedule")]
    [HttpPut]
    public async Task<ActionResult<Schedule>> UpdateVetScheduleAsync(DateOnly date, string oldID, string newID)
    {
        try
        {
            var schedule = await _unitOfWork.ScheduleRepository.UpdateVetScheduleAsync(date, oldID, newID);
            if (schedule == null)
                return NotFound("Date is not found!");
            return Ok($"Updated successfully!");
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [Route("GetScheduleByDate")]
    [HttpGet]
    public async Task<ActionResult<List<Schedule>>> GetScheduleByDate(DateOnly date, string empid)
    {
        if (await _unitOfWork.ScheduleRepository.CheckValidDateAsync(date, empid) == null)
            return NotFound("Date is not found!");
        return await _unitOfWork.ScheduleRepository.SearchByDateAsync(date, empid);
    }

    [Route("GetScheduleByName")]
    [HttpGet]
    public async Task<ActionResult<List<Schedule>>> GetScheduleByName(string firstname, string lastname)
    {
        if (await _unitOfWork.ScheduleRepository.CheckValidNameAsync(firstname, lastname) == null)
            return NotFound("Name is not found!");
        return await _unitOfWork.ScheduleRepository.SearchByNameAsync(firstname, lastname);
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
