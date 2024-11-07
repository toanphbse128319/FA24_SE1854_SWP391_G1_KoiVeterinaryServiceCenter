using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

using Repositories.Model;
using Repositories.Objects;

namespace Repositories.Repository
{
    public class BookingDetailRepository : GenericRepository<BookingDetail>
    {
        public BookingDetailRepository(Context context)
        {
            _context = context;
        }

        public Task<List<BookingDetail>> GetByBookingID(string id)
        {
            return _context.BookingDetails.Where(bookingdetail => bookingdetail.BookingID.ToLower() == id.ToLower()).ToListAsync()!;
        }

        public Task<List<BookingDetail>> GetByServiceID(string id)
        {
            return _context.BookingDetails.Where(bookingdetail => bookingdetail.ServiceID.ToLower() == id.ToLower()).ToListAsync()!;
        }

        public async Task<List<BookingDetail>> GetBookingDetailsByBookingIDAsync(string id)
        {
            return await (_context.BookingDetails.Where(bookingdetail => bookingdetail.BookingID.ToLower() == id)).ToListAsync();
        }

        public async Task<List<BookingDetail>> GetByProfileIDAsync( string id ){
            List<Booking> bookings = await (new BookingRepository(_context)).GetByProfileIDAsync(id);
            List<BookingDetail> bookingDetails = new List<BookingDetail>();
            foreach( Booking booking in bookings ){
                bookingDetails.AddRange( await GetByBookingID( booking.BookingID ) );
            }
            return bookingDetails;
        }

        public async Task<string> AddBookingDetailAsync(BookingDetail bd)
        {
            if( await base.GetByIdAsync(bd.BookingDetailID) != null )
                return "Invalid: Booking detail already existed";
            if (await _context.BookingDetails.FindAsync(bd.BookingDetailID) != null)
                return "Invalid: Cannot detemined the booking order";
            ServiceRepository servicerepo = new(_context);
            Service? service = await servicerepo.GetByIdAsync(bd.ServiceID);
            if (service == null)
                return "Invalid: Cannot detemined the service used";
            bd.BookingDetailID = GetNextID("BD");
            await base.CreateAsync(bd);
            return bd.BookingDetailID;
        }
        
    }
}
