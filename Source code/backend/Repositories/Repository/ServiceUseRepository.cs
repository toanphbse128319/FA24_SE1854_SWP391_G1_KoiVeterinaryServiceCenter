using Repositories.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Repositories.Repository
{
    public class ServiceUseRepository : GenericRepository<ServiceUse>
    {
        public ServiceUseRepository(Context context)
            : base(context)
        {

        }
        public async Task<List<ServiceUse>> GetServiceUsesByBDsAsync(List<BookingDetail> bds)
        {
            // tim 1 list serviceuse dat truoc de them dich vu
            List<ServiceUse> list = new List<ServiceUse>();
            foreach (var item in bds)
            {
                //1 bd co the co nhieu service use nen xai where de lay list su
                List<ServiceUse> serviceUses = (await _context.ServiceUses.Where(su => su.BookingDetailID == item.BookingDetailID).ToListAsync());
                //neu tim thay su thi add vao list
                if (serviceUses.Any())
                {
                    foreach (var su in serviceUses)
                    {
                        list.Add(su);
                    }
                }
            }
            return list;
        }


        //moc list serviceuses cu~ ra them dich vu moi vao
        public async Task<int> AddServiceUsesAsync(List<ServiceUse> ServiceUses,List<BookingDetail> bds)
        {
            //check delivery method de xac dinh create serviceuse cho fish hoac pool
            BookingRepository bookingrepo = new BookingRepository(_context);
            Booking booking = await bookingrepo.GetByIdAsync(bds[0].BookingID);
            //result de biet duong rollback
            bool rs = false;
            int count = 0;
            foreach (var su in ServiceUses)
            {
                {
                    foreach (var bd in bds)
                    {
                        if(await base.CreateAsync(new ServiceUse() { ServiceUseID = GetNextID("SU"), AnimalProfileID = su.AnimalProfileID, BookingDetailID = bd.BookingDetailID, PoolProfileID = su.PoolProfileID }) != 0)
                            count++;
                    }
                }
                
            }
            if (count == (ServiceUses.Count * bds.Count))
            {
                //commit transaction here
                rs = true;
                return 1;
            }
            else
                return 0;
                
        }
    }
}
