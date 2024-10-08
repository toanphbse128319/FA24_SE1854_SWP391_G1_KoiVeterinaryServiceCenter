using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Repositories.Model;
using Microsoft.EntityFrameworkCore;
using Repositories.Repository;
using Repositories;
using Microsoft.IdentityModel.Tokens;


namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GetVetScheduleController : ControllerBase
    {
        private UnitOfWork _unitOfWork;
        public GetVetScheduleController(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetVetBookings(String id)
        {
            try
            {
                if (await _unitOfWork.EmployeeRepository.FindEmpByIdAsync(id) == null)
                    return BadRequest("EmployeeID is not existed!");
                 List<Booking> list = await _unitOfWork.BookingRepository.GetVetBookingsAsync(id);
                if(list.Count == 0) 
                    return NotFound("Vet schedule is empty!");
                return list;
            }
            catch (Exception ex)
            {
                return BadRequest("Unknown Error: " + ex.Message);
            }
        }
    }
}
