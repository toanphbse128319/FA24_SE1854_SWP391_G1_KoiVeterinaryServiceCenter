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
    public class BookingDetailController : ControllerBase
    {
        private UnitOfWork _unitOfWork;
        public BookingDetailController(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<BookingDetail>> GetBookingDetailByID(string id)
        {
            return await _unitOfWork.BookingDetailRepository.GetByIdAsync(id);
        }

        [HttpPut]
        public async Task<ActionResult<BookingDetail?>> UpdateBookingDetail(BookingDetail info)
        {
            try
            {
                if(await _unitOfWork.BookingDetailRepository.UpdateAsync(info) == 0)
                    return NotFound("BookingDetail does not existed!");
                else
                    return Ok("Changes have been saved");
            }
            catch (Exception ex)
            {
                return BadRequest("Unknown Error: " + ex.Message);
            }


        }

    }
}