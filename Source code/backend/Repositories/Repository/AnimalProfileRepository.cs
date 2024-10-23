using Microsoft.EntityFrameworkCore;
using Repositories.Model;

namespace Repositories.Repository
{
    public class AnimalProfileRepository : GenericRepository<AnimalProfile>
    {
        public AnimalProfileRepository(Context context)
        {
            _context = context;
        }

        public Task<List<AnimalProfile?>> GetByBookingDetailID(string id)
        {
            return _context.AnimalProfiles.Where(animalprofile => animalprofile.BookingDetailID.ToLower() == id.ToLower()).ToListAsync()!;
        }

        public async Task<int> AddAnimalProfileAsync(AnimalProfile animalprofile)
        {
            if (animalprofile == null)
                return 0;
            if (animalprofile.AnimalProfileID == "")
            {
                animalprofile.AnimalProfileID = GetNextID("AP");
            }
            return await base.CreateAsync(animalprofile);;
        }
    }
}
