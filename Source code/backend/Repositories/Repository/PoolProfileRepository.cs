using Microsoft.EntityFrameworkCore;
using Repositories.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Repository
{
    public class PoolProfileRepository : GenericRepository<PoolProfile>
    {
        public PoolProfileRepository(Context context) 
        {
            _context = context;
        }

        public Task<List<PoolProfile?>> GetByBookingDetailID(string id)
        {
            return _context.PoolProfiles.Where(poolprofile => poolprofile.BookingDetailID.ToLower() == id.ToLower()).ToListAsync()!;
        }

        public async Task<int> AddPoolProfileAsync(PoolProfile poolprofile)
        {
            if (poolprofile == null)
                return 0;
            if (poolprofile.PoolProfileID == "")
            {
                int index = base.GetAll().Count;
                poolprofile.PoolProfileID = "PP" + index;
            }
            return await base.CreateAsync(poolprofile);;
        }
    }
}
