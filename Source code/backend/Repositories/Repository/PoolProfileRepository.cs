using Microsoft.EntityFrameworkCore;
using Repositories.Model;

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
                poolprofile.PoolProfileID = GetNextID("PP");
            }

            return await base.CreateAsync(poolprofile);;
        }
    }
}
