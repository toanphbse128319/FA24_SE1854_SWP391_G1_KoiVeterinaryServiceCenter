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

        public async Task<int> UpdateAsync(BookingDetail info)
        {
            BookingDetail bookingdetail = await base.GetByIdAsync(info.BookingDetailID);
            if (bookingdetail == null)
            {
                return 0;
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
                bookingdetail.Incidental = info.Incidental;
                return await base.UpdateAsync(bookingdetail);
            }
        }
    }
}
