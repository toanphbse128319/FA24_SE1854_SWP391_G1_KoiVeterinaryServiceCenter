#nullable disable
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

    //Change AddSchedule from receive UpdateSchedule to Schedule for easier validation
    [HttpPost]
    public async Task<ActionResult<Schedule>> AddScheduleAsync(Schedule info)
    {
        _unitOfWork.BeginTransactionAsync();
        string result = "";
        try
        {
            if (info.EmployeeID == null)
                return BadRequest("Missing id parameter!");
            if (info.Date == new DateOnly() || info.EmployeeID.Trim().Length == 0)
                return BadRequest("Parameter(s) cannot be empty!");
            if (await _unitOfWork.ScheduleRepository.CheckValidDateAsync(info.Date, info.EmployeeID, "", 0) != null)
                return BadRequest("Working day for that vet is already existed!");
            for (int i = 0; i < 4; i++)
            {
                Schedule schedule = new Schedule()
                {
                    //Tại sao lại thêm id ở dây làm gì nếu AddNewScheduleAsync đã làm??
                    //ScheduleID = info.ScheduleID, 
                    Status = info.Status,
                    Date = info.Date.AddDays(i * 7),
                    EmployeeID = info.EmployeeID,
                    Note = info.Note
                };
                await _unitOfWork.ScheduleRepository.AddNewScheduleAsync(schedule);
            }
            
            _unitOfWork.CommitTransactionAsync();
            result = "Ok";
            return Ok("Added successfully!");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        } finally {
            if( result != "Ok" ){
                _unitOfWork.RollbackTransactionAsync();
            }
        }
    }

    [Route("AssignSchedule")]
    [HttpPut]
    public async Task<ActionResult<SlotTable>> AssignVet(string EmpID, DateOnly date, int slot, string smd)
    {
        try
        {
            if (EmpID == null)
                return BadRequest("Missing parameter!");
            Schedule schedule = await _unitOfWork.ScheduleRepository.SearchVetAndDateAsync(date, EmpID);
            if (schedule == null)
                return BadRequest("The Employee is not exists");
            await _unitOfWork.SlotTableRepository.OrderSlotAsync(slot, schedule.ScheduleID, smd);
            return Ok("Assigned successfully!");

        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [Route("UpdateSlotInforByEmployeeID")]
    [HttpPut]
    public async Task<ActionResult<SlotTable>> UpdateSlotInforByEmpIDAsync(int slotNo, string scheduleID, string note, int slotCapacity)
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
            return Ok("Updated successfully!");
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
        try
        {
            if (await _unitOfWork.ScheduleRepository.CheckValidScheduleAsync(date) == null)
                return NotFound("Date is not found!");
            return await _unitOfWork.ScheduleRepository.SearchByDateAsync(date);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [Route("GetScheduleByName")]
    [HttpGet]
    public async Task<ActionResult<List<Schedule>>> GetScheduleByName(string firstname, string lastname)
    {
        try
        {
            if (await _unitOfWork.ScheduleRepository.CheckValidNameAsync(firstname, lastname) == null)
                return NotFound("Name is not found!");
            return await _unitOfWork.ScheduleRepository.SearchByNameAsync(firstname, lastname);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [Route("GetScheduleByNameAndDate")]
    [HttpGet]
    public async Task<ActionResult<List<SlotTable>>> GetScheduleByEmpIDAndDate(string EmpID, DateOnly date)
    {
        try
        {
            Schedule schedule = await _unitOfWork.ScheduleRepository.SearchVetAndDateAsync(date, EmpID);
            if (schedule == null)
                return NotFound("Name is not found!");
            return await _unitOfWork.SlotTableRepository.SearchByScheduleIDAsync(schedule.ScheduleID);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [Route("get30daysschedule")]
    [HttpGet]
    public async Task<ActionResult<List<Schedule>>> Get30DaysSchedule(DateOnly date)
    {
        try
        {
            List<Schedule> list = await _unitOfWork.ScheduleRepository.Get30DaysScheduleAsync(date);
            if (list.Count == 0)
                return NotFound("There's no schedule at that date");
            return list;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [Route("getslotin30days")]
    [HttpGet]
    public async Task<ActionResult<List<SlotTable>>> GetSlotIn30Days(DateOnly date)
    {
        try
        {
            List<SlotTable> list = await _unitOfWork.ScheduleRepository.GetSlotIn30Days(date);
            if (list.Count == 0)
                return NotFound("There's no schedule at that date");
            return list;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }

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
