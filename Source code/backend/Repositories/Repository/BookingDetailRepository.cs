using Microsoft.EntityFrameworkCore;
using Repositories.Model;

namespace Repositories.Repository
{
    public class BookingDetailRepository : GenericRepository<BookingDetail>
    {
        public BookingDetailRepository(Context context)
        {
            _context = context;
        }

        public Task<List<BookingDetail?>> GetByBookingID(string id)
        {
            return _context.BookingDetails.Where(bookingdetail => bookingdetail.BookingID.ToLower() == id.ToLower()).ToListAsync()!;
        }

        public Task<List<BookingDetail?>> GetByServiceID(string id)
        {
            return _context.BookingDetails.Where(bookingdetail => bookingdetail.ServiceID.ToLower() == id.ToLower()).ToListAsync()!;
        }

        public async Task<int> AddBookingDetailAsync(BookingDetail bd)
        {
            if (await _context.BookingDetails.FindAsync(bd.BookingDetailID) != null)
                return 0;
            if (bd.BookingDetailID == null || bd.BookingDetailID == "")
            {
                bd.BookingDetailID = GetNextID("BD");
            }
            ServiceRepository servicerepo = new ServiceRepository(_context);
            Service? service = await servicerepo.GetByIdAsync(bd.ServiceID);
            if (service == null)
                return 0;
            bd.UnitPrice = service.Price;
            return await base.CreateAsync(bd);
        }

        public async Task<int> AddBookingDetailsAsync(IEnumerable<BookingDetail> bds)
        {
            if (bds == null || !bds.Any())
                return 0;

            int successfulSaves = 0;

            foreach (var bd in bds)
            {
                if (string.IsNullOrEmpty(bd.BookingDetailID))
                {
                    bd.BookingDetailID = GetNextID("BD");
                }

                try
                {
                    await base.CreateAsync(bd);
                    successfulSaves++;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                    Console.WriteLine($"Error saving AnimalProfile: {ex.Message}");
                }
            }

            return successfulSaves;
        }
    }
}
