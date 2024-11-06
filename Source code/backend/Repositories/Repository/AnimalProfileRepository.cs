using Microsoft.EntityFrameworkCore;
using Repositories.Model;
using Repositories.Objects;

namespace Repositories.Repository
{
    public class AnimalProfileRepository : GenericRepository<AnimalProfile>
    {
        public AnimalProfileRepository(Context context)
        {
            _context = context;
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
                }
            }

            return successfulSaves;
        }

        public async Task<int> AddProfilesAsync(Profiles exam)
        {
            var transaction = await _context.Database.BeginTransactionAsync();
            bool rs = false;
            int count = 0;
            ServiceUseRepository surepo;
            try
            {

                foreach (var item in exam.AnimalProfile)
                {
                    AnimalProfileRepository ap = new AnimalProfileRepository(_context);
                    item.AnimalProfileID = ap.GetNextID("AP");
                    if (await ap.CreateAsync(item) != 0)
                        count++;
                    surepo = new ServiceUseRepository(_context);
                    await surepo.CreateAsync(new ServiceUse() { ServiceUseID = surepo.GetNextID("SU") , AnimalProfileID = item.AnimalProfileID , BookingDetailID = exam.BookingDetail.BookingDetailID});
                }
                foreach (var item in exam.PoolProfile)
                {
                    PoolProfileRepository pp = new PoolProfileRepository(_context);
                    item.PoolProfileID = pp.GetNextID("PP");
                    if (await pp.CreateAsync(item) != 0)
                        count++;
                    surepo = new ServiceUseRepository(_context);
                    await surepo.CreateAsync(new ServiceUse() { ServiceUseID = surepo.GetNextID("SU"), AnimalProfileID = item.PoolProfileID, BookingDetailID = exam.BookingDetail.BookingDetailID });
                }
                if (count == (exam.AnimalProfile.Count + exam.PoolProfile.Count))
                    rs = true;

                await transaction.CommitAsync();
                return rs ? 1 : 0;
            }
            finally
            {
                if (rs == false)
                    await transaction.RollbackAsync();
            }
        }
    }
}
