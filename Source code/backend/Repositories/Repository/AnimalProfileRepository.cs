using Microsoft.EntityFrameworkCore;
using Repositories.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Repository
{
    public class AnimalProfileRepository : GenericRepository<AnimalProfile>
    {
        public AnimalProfileRepository(Context context)
        {
            _context = context;
        }

        public async Task<AnimalProfile?> AddAnimalProfileAsync(AnimalProfile animalprofile)
        {
            if (animalprofile.AnimalProfileID == "")
            {
                int index = base.GetAll().Count;
                animalprofile.AnimalProfileID = "AP" + index;
            }
            await base.CreateAsync(animalprofile);
            return animalprofile;
        }
    }
}
