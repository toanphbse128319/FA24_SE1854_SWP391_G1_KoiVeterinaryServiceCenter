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
        public async Task<List<ServiceUse>> FindSUByListBookingDetailIDAsync(string id)
        {
            return await _context.ServiceUses.Where(su => su.BookingDetailID == id).ToListAsync();
        }
    }
}
