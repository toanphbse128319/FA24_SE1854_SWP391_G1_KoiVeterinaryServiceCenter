using Microsoft.EntityFrameworkCore;
using Repositories.Data;
using Repositories.Models;

namespace Business.DAO
{
    public class BookingDAO
    {
        private readonly BookingContext _context = null;

        public BookingDAO(BookingContext context)
        {
            if (context is null)
            {
                throw new Exception("Context is not initialized");
            }
            _context = context;
        }

        public async Task<Booking?> UpdateBookingStatus(string id, string msg)
        {
            Booking? booking = await GetBookingAsync(id); 
            booking.Status = msg;
            _context.Entry(booking).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return booking;
        }

        public async Task<Booking?> GetBookingAsync(string id)
        {
            return await _context.Bookings.FromSqlRaw("SELECT * FROM dbo.Booking WHERE BookingID = {0}", id).FirstOrDefaultAsync();
        }
    }
}
