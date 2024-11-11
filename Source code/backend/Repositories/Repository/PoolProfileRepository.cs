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

    public bool IsDuplicate( PoolProfile target ){
        PoolProfile? temp = _context.PoolProfiles.FirstOrDefault( profile => profile.Name == target.Name &&
                                                                             profile.Note == target.Note &&
                                                                             profile.Width == target.Width &&
                                                                             profile.Description == target.Description &&
                                                                             profile.Height == target.Height &&
                                                                             profile.Depth == target.Depth &&
                                                                             profile.Picture == target.Picture );

        if( temp == null )
            return false;
        return true;
    }


        public async Task<string> AddPoolProfileAsync(PoolProfile poolprofile)
        {
            if (poolprofile == null)
                return "Invalid: ID cannot be null";
            AnimalTypeRepository _repo = new(_context);
            if( base.GetById( poolprofile.PoolProfileID ) != null )
                return "Invalid: Profile already exist";
            if (poolprofile.PoolProfileID == "")
            {
                poolprofile.PoolProfileID = GetNextID("PP");
            }
            await base.CreateAsync(poolprofile);;
            return poolprofile.PoolProfileID;
        }

        //Return 1 if successfully add all and 0 if failed even a single one
        public async Task<string> AddPoolProfilesAsync(IEnumerable<PoolProfile> poolProfiles)
        {
            if( poolProfiles == null || poolProfiles.Count() == 0 )
                return "Invalid: pool profiles list cannot be empty";
            foreach (PoolProfile animalProfile in poolProfiles)
            {
                string result = await AddPoolProfileAsync( animalProfile );
                if( result.ToLower().Contains("invalid") )
                    return result;
            }
            return "Success";
        }

    }
}

