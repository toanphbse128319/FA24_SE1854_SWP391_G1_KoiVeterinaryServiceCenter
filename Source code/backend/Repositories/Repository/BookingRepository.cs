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

        public Task<List<Booking>> GetVetBookingsAsync(string id)
        {
            return _context.Bookings.Where(booking => booking.EmployeeID.ToLower() == id.ToLower() && booking.BookingDate.Date >= DateTime.Today.Date).ToListAsync();
        }

        public async Task<int> UpdateStatusAsync(string id, string msg)
        {
            Booking booking = await base.GetByIdAsync(id);
            if (booking == null)
            {
                return 0;
            }
            else
            {
                booking.Status = msg;
                return await _context.SaveChangesAsync();;
            }
        }


    }
}
