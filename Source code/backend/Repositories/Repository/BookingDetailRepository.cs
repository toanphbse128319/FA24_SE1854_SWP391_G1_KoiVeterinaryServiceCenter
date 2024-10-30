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

        public async Task<int> AddExaminationResultAsync(ExaminationResult exam)
        {
            var transaction = _context.Database.BeginTransaction();
            bool rs = true;
            try
            {
                
                foreach (var item in exam.BookingDetail)
                {
                    item.BookingDetailID = GetNextID("BD");
                    if (await base.CreateAsync(item) == 0)
                        rs = false;
                }
                foreach (var item in exam.AnimalProfile)
                {
                    AnimalProfileRepository ap = new AnimalProfileRepository(_context);
                    item.AnimalProfileID = GetNextID("AP");
                    if (await ap.CreateAsync(item) == 0)
                        rs = false;
                }
                foreach (var item in exam.PoolProfile)
                {
                    PoolProfileRepository pp = new PoolProfileRepository(_context);
                    item.PoolProfileID = GetNextID("PP");
                    if (await pp.CreateAsync(item) == 0)
                        rs = false;
                }

                return rs ? 1 : 0;
            }
            finally
            {
                if(rs == false)
                await transaction.RollbackAsync();
            }
        }
    }
}
