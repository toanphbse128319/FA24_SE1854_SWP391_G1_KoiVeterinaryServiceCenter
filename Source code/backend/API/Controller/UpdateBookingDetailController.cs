using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Repositories.Model;
using Microsoft.EntityFrameworkCore;
using Repositories.Repository;
using Repositories;


namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UpdateBookingDetailController : ControllerBase
    {
        private UnitOfWork _unitOfWork;
        public UpdateBookingDetailController(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPut]
        public async Task<ActionResult<BookingDetail?>> UpdateBookingDetail(BookingDetail info)
        {
            try
            {
                var bookingdetail = await _unitOfWork.BookingDetailRepository.UpdateAsync(info);
                if (bookingdetail == null)
                    return NotFound("BookingDetail does not existed!");
                else
                    return Ok(bookingdetail);
            }
            catch (Exception ex)
            {
                return BadRequest("Unknown Error: " + ex.Message);
            }


        }

    }
}