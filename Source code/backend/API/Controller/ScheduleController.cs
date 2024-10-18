#nullable disable
using Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Repositories;
using Repositories.Model;
using Repositories.Repository;
using System.Security.Cryptography;
using System.Security.Cryptography.Pkcs;
using static System.Runtime.InteropServices.JavaScript.JSType;

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
    public async Task<ActionResult<Schedule>> AddScheduleAsync(UpdateSchedule info)
    {
        try
        {
            if (info.EmployeeID == null)
                return BadRequest("Missing id parameter!");
            if (info.Date == new DateOnly() || info.EmployeeID.Trim().Length == 0)
                return BadRequest("Parameter(s) cannot be empty!");
            if (await _unitOfWork.ScheduleRepository.CheckValidDateAsync(info.Date, info.EmployeeID) != null)
                return BadRequest("Working day for that vet is already existed!");
            Schedule schedule = new Schedule(){
                ScheduleID = info.ScheduleID,
                Status = info.Status,
                Date = info.Date,
                EmployeeID = info.EmployeeID,
                Note = info.Note
            };
            await _unitOfWork.ScheduleRepository.AddNewSchedule(schedule);
            return Ok("Added successfully!");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [Route("AssignSchedule")]
    [HttpPut]
    public async Task<ActionResult<SlotTable>> AssignVet(string EmpID, DateOnly date, int slot)
    {
        try
        {
            if (EmpID== null)
                return BadRequest("Missing parameter!");
            Schedule schedule = await _unitOfWork.ScheduleRepository.SearchVetAndDateAsync(date, EmpID);
            if (schedule == null)
                return BadRequest("The Employee is not exists");
            await _unitOfWork.SlotTableRepository.OrderSlot(slot, schedule.ScheduleID);
            return Ok("Assigned successfully!");
            
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [Route("UpdateSlotByEmployeeID")]
    [HttpPut]
    public async Task<ActionResult<SlotTable>> UpdateSlotStatusByEmpIDAsync(int slotNo, string scheduleID, string note, int slotCapacity)
    {
        try
        {
            SlotTable slotTable = new()
            {
                Slot = slotNo,
                ScheduleID = scheduleID,
                Note = note,
                SlotCapacity = slotCapacity
            };
            var slot = await _unitOfWork.SlotTableRepository.UpdateSlotInformationAsync(slotTable);
            if (slot == null)
                return NotFound("Date is not found!");
            if (slot.SlotStatus == true)
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
    public async Task<ActionResult<Schedule>> UpdateVetScheduleAsync(DateOnly date, string oldEmpID, string newEmpID)
    {
        try
        {
            var schedule = await _unitOfWork.ScheduleRepository.UpdateVetScheduleAsync(date, oldEmpID, newEmpID);
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
    public async Task<ActionResult<List<Schedule>>> GetScheduleByDate(DateOnly date)
    {
        if (await _unitOfWork.ScheduleRepository.CheckValidScheduleAsync(date) == null)
            return NotFound("Date is not found!");
        return await _unitOfWork.ScheduleRepository.SearchByDateAsync(date);
    }

    [Route("GetScheduleByName")]
    [HttpGet]
    public async Task<ActionResult<List<Schedule>>> GetScheduleByName(string firstname, string lastname)
    {
        if (await _unitOfWork.ScheduleRepository.CheckValidNameAsync(firstname, lastname) == null)
            return NotFound("Name is not found!");
        return await _unitOfWork.ScheduleRepository.SearchByNameAsync(firstname, lastname);
    }

    [Route("GetScheduleByNameAndDate")]
    [HttpGet]
    public async Task<ActionResult<List<SlotTable>>> GetScheduleByEmpIDAndDate(string EmpID, DateOnly date)
    {
        Schedule schedule = await _unitOfWork.ScheduleRepository.SearchVetAndDateAsync(date, EmpID);
        if (schedule == null)
            return NotFound("Name is not found!");
        return await _unitOfWork.SlotTableRepository.SearchByScheduleIDAsync(schedule.ScheduleID);
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
