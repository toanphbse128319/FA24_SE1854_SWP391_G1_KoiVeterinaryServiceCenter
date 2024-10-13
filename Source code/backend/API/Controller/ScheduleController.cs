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