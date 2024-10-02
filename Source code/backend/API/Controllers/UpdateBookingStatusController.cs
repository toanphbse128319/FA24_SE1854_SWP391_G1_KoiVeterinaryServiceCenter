using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Repositories.Data;
using Repositories.Models;
using Business.DAO;
using Microsoft.EntityFrameworkCore;


namespace API.Controllers
{ 
    [Route("api/[controller]")]
    [ApiController]
    public class UpdateBookingStatusController : Controller
    {
        private readonly BookingContext _context =null;
        public UpdateBookingStatusController(BookingContext context)
        {
            _context = context;
        }

        [HttpPut("id")]
        public async Task<ActionResult<Booking?>> Update(string id, [FromBody] string msg)
        {
            BookingDAO dao = new BookingDAO(_context);
            var updatedBooking = await dao.UpdateBookingStatus(id, msg);
            return updatedBooking;
        }
    }
}
