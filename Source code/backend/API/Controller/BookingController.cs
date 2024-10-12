#nullable disable
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Repositories.Model;
using Microsoft.EntityFrameworkCore;
using Repositories.Repository;
using Repositories;
using Microsoft.IdentityModel.Tokens;
using Helper;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private UnitOfWork _unitOfWork;
        public BookingController(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<Booking>> GetBookingByID(string id)
        {
            return await _unitOfWork.BookingRepository.GetByIdAsync(id);
        }

        [HttpPut]
        public async Task<ActionResult<Booking?>> UpdateStatusAsync(UpdateStatusInformation info)
        {
            try
            {
                var booking = await _unitOfWork.BookingRepository.UpdateStatusAsync(info.Id, info.Message);
                if (booking == null)
                    return NotFound("Booking is not found!");
                return Ok($"The Booking Status has been updated to: {info.Message}");
            }
            catch (Exception ex)
            {
                return BadRequest("Unknown Error: " + ex.Message);
            }
        }

            [HttpGet]
            public async Task<ActionResult<IEnumerable<Booking?>>> GetVetBookings(string id)
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
    }
