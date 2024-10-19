using Microsoft.EntityFrameworkCore;
using Repositories.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
            if (bd.BookingDetailID == "")
            {
                int index = base.GetAll().Count;
                bd.BookingDetailID = "BD" + index;
            }

            ServiceRepository servicerepo = new ServiceRepository(_context);
            Service? service = await servicerepo.GetByIdAsync(bd.ServiceID);
            if (service == null)
                return 0;
            bd.UnitPrice = service.Price;
            return await base.CreateAsync(bd);
        }
    }
}
