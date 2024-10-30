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

        public async Task<int> AddPoolProfilesAsync(IEnumerable<PoolProfile> pps)
        {
            if (pps == null || !pps.Any())
                return 0;

            int successfulSaves = 0;

            foreach (var pp in pps)
            {
                if (string.IsNullOrEmpty(pp.PoolProfileID))
                {
                    pp.PoolProfileID = GetNextID("PP");
                }

                try
                {
                    await base.CreateAsync(pp);
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

