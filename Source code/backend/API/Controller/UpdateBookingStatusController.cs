using Microsoft.AspNetCore.Mvc;
using Repositories.Model;
using Repositories;
using Helper;


namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UpdateBookingStatusController : ControllerBase
    {
        private UnitOfWork _unitOfWork;
        public UpdateBookingStatusController(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPut]
        public async Task<ActionResult<Booking?>> UpdateStatusAsync(UpdateStatusInformation info)
        {
            try
            {
                var booking = await _unitOfWork.BookingRepository.UpdateStatusAsync(info.Id,info.Message);
                if (booking == null)
                    return NotFound("Booking is not found!");
                return booking;
            }
            catch (Exception ex) 
            {
                return BadRequest("Unknown Error: " + ex.Message);
            }

            
        }
    }
}
