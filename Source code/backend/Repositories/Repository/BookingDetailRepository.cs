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

        public Task<BookingDetail> FindBookingDetailAsync(string id)
        {
            return _context.BookingDetails.FirstOrDefaultAsync(bookingdetail => bookingdetail.BookingDetailID == id);
        }
        public async Task<BookingDetail> UpdateAsync(BookingDetail info)
        {
            BookingDetail bookingdetail = await FindBookingDetailAsync(info.BookingDetailID);
            if (bookingdetail == null)
            {
                return bookingdetail;
            }
            else
            {
                bookingdetail.DrugList = info.DrugList;
                bookingdetail.NoteResult = info.NoteResult;
                bookingdetail.MaterialList = info.MaterialList;
                bookingdetail.ConsultDoctor = info.ConsultDoctor;
                bookingdetail.PoolStatusDescription= info.PoolStatusDescription;
                bookingdetail.AnimalStatusDescription = info.AnimalStatusDescription;
                bookingdetail.ConsultTechnician = info.ConsultTechnician;
                bookingdetail.NoteExamination = info.NoteExamination;
                await _context.SaveChangesAsync();
                return bookingdetail;
            }
        }
    }
}
