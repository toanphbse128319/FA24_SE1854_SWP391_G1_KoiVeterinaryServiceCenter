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

        public async Task<int> AddAnimalProfilesAsync(IEnumerable<AnimalProfile> animalProfiles)
        {
            if (animalProfiles == null || !animalProfiles.Any())
                return 0;

            int successfulSaves = 0;

            foreach (var animalProfile in animalProfiles)
            {
                if (string.IsNullOrEmpty(animalProfile.AnimalProfileID))
                {
                    animalProfile.AnimalProfileID = GetNextID("AP");
                }

                try
                {
                    await base.CreateAsync(animalProfile);
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
