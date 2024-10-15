using Microsoft.AspNetCore.Mvc;
using Repositories.Model;
using Repositories;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingDetailController : ControllerBase
    {
        private UnitOfWork _unitOfWork;
        public BookingDetailController(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("ByBookingDetailID")]
        public async Task<ActionResult<BookingDetail>> GetBookingDetailByID(string id)
        {
            BookingDetail bd = await _unitOfWork.BookingDetailRepository.GetByIdAsync(id);
            if (bd != null)
                return bd;
            else
                return NotFound("Booking Detail does not existed!");
        }

        [HttpGet("ByBookingID")]
        public async Task<ActionResult<IEnumerable<BookingDetail?>>> GetBookingDetailsByBookingID(string id)
        {
            List<BookingDetail?> list = await _unitOfWork.BookingDetailRepository.GetByBookingID(id);
            if(list.Count == 0)
                return NotFound("Booking Detail not found!");
            else return Ok(list);
        }

        [HttpGet("ByServiceID")]
        public async Task<ActionResult<IEnumerable<BookingDetail?>>> GetBookingDetailsByServiceID(string id)
        {
            List<BookingDetail?> list = await _unitOfWork.BookingDetailRepository.GetByServiceID(id);
            if (list.Count == 0)
                return NotFound("Booking Detail not found!");
            else return Ok(list);
        }

        [HttpPut]
        public async Task<ActionResult<BookingDetail?>> UpdateBookingDetail(BookingDetail info)
        {
            try
            {
                BookingDetail bd = await _unitOfWork.BookingDetailRepository.GetByIdAsync(info.BookingDetailID);
                if (bd == null)
                    return NotFound("BookingDetail does not existed!");
                if (await _unitOfWork.BookingDetailRepository.UpdateAsync(info) == 0)
                    return BadRequest("BookingDetail has not been updated!");
                else
                    return Ok("Changes have been saved");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

    }
}
