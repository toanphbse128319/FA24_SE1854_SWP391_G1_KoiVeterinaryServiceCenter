#nullable disable
using Microsoft.EntityFrameworkCore;
using Repositories.Model;

namespace Repositories.Repository
{
    public class BookingRepository : GenericRepository<Booking>
    {

        public BookingRepository(Context context)
        {
            
            _context = context;
        }
        public Task<Booking> FindBookingAsync(string id)
        {
            return _context.Bookings.FirstOrDefaultAsync(booking => booking.BookingID == id);
        }

        public Task<List<Booking>> GetVetBookingsAsync(string id)
        {
            return _context.Bookings.Where(booking => booking.EmployeeID == id && booking.BookingDate.Date >= DateTime.Today.Date) .ToListAsync();
        }
        public async Task<Booking> UpdateStatusAsync(string id, string msg)
        {
            Booking booking = await FindBookingAsync(id);
            if (booking == null)
            {
                return booking;
            }
            else
            {
                booking.Status = msg;
                await _context.SaveChangesAsync();
                return booking; 
            }
        }

        
    }
}
