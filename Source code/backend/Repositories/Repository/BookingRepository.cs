using Microsoft.EntityFrameworkCore;
using Repositories.Data;
using Repositories.Model;

namespace Repositories.Repository
{
    public class BookingRepository : GenericRepository<Booking>
    {

        public BookingRepository(Context context)
        {
            
            _context = context;
        }
        public Task<Booking?> FindBookingAsync(string id)
        {
            return _context.Bookings.FirstOrDefaultAsync(booking => booking.BookingID == id);
        }
        public async Task<Booking?> UpdateStatusAsync(string id, string msg)
        {
            Booking booking = await FindBookingAsync(id);
            if (booking == null)
            {
                return booking;
            }
            else
            {
                booking.Status = msg;
                _context.SaveChangesAsync();
                return booking; 
            }
        }

        
    }
}
