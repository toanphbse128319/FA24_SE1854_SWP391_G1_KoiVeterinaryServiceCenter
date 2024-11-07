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
            return await base.CreateAsync(bd);
        }

        public async Task<int> AddExaminationResultAsync(ExaminationResult exam)
        {
            var transaction = await _context.Database.BeginTransactionAsync();
            bool rs = false;
            int count = 0;
            ServiceUseRepository surepo = new(_context);
            try
            {
                //cap nhat so ca cua booking
                BookingRepository bookingrepo = new BookingRepository(_context);
                if (await bookingrepo.UpdateIncidentalByIDAsync(exam.BookingDetail[0].BookingID,exam.AnimalProfile.Count(),exam.PoolProfile.Count()) == 0)
                    return 0;

                //tao moi profile,bd phat sinh, tao service use luon
                foreach (var bd in exam.BookingDetail)
                {
                    bd.BookingDetailID = GetNextID("BD");
                    if (await base.CreateAsync(bd) != 0)
                        count++;
                    foreach (var ap in exam.AnimalProfile)
                    {
                        AnimalProfileRepository aprepo = new AnimalProfileRepository(_context);
                        ap.AnimalProfileID = aprepo.GetNextID("AP");
                        if (await aprepo.CreateAsync(ap) != 0)
                            count++;
                        surepo = new ServiceUseRepository(_context);
                        await surepo.CreateAsync(new ServiceUse() { ServiceUseID = surepo.GetNextID("SU"), AnimalProfileID = ap.AnimalProfileID, BookingDetailID = bd.BookingDetailID });
                    }
                    foreach (var pp in exam.PoolProfile)
                    {
                        PoolProfileRepository pprepo = new PoolProfileRepository(_context);
                        pp.PoolProfileID = pprepo.GetNextID("PP");
                        if (await pprepo.CreateAsync(pp) != 0)
                            count++;
                        surepo = new ServiceUseRepository(_context);
                        await surepo.CreateAsync(new ServiceUse() { ServiceUseID = surepo.GetNextID("SU"), PoolProfileID = pp.PoolProfileID, BookingDetailID = bd.BookingDetailID });
                    }
                }
                

                //so sanh so cot da duoc tao trong db so voi du lieu da dc nhap neu sai thi rollback
                if(count == (exam.AnimalProfile.Count + exam.BookingDetail.Count + exam.PoolProfile.Count))
                    rs = true;

                //Buoc 1 lay booking tu 1 bd co san
                //Buoc 2 lay list bd = bookingid
                //Buoc 3 lay list su da co san = list bd o buoc 2
                //Buoc 4 sau khi co serviceuse co san ta se lay tu no FishID hoac PoolID
                //de tien hanh them dich vu moi cho Fish or Pool

                if (await surepo.AddServiceUsesAsync(await surepo.GetServiceUsesByBDsAsync(await GetBookingDetailsByBookingIDAsync(exam.BookingDetail[0].BookingID)), exam.BookingDetail) == 0)
                    rs = false;
                await transaction.CommitAsync();
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
