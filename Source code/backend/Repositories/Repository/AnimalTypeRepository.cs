using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Repositories.Model;

namespace Repositories.Repository
{
    public class AnimalTypeRepository : GenericRepository<AnimalType>
    {
        public AnimalTypeRepository(Context context) 
        {
            _context = context;
        }

        public Task<AnimalType?> FindAnimalTypeByIdAsync(string id)
        {
            return _context.AnimalTypes.FirstOrDefaultAsync(animaltype => animaltype.TypeID == id)!;
        }

        public Task<AnimalType?> FindAnimalTypeByNameAsync(string name)
        {
            return _context.AnimalTypes.FirstOrDefaultAsync(at => at.Name.Equals(name))!;
        }

        public async Task<AnimalType?> AddAnimalTypeAsync(AnimalType animaltype)
        {
            if (await FindAnimalTypeByNameAsync(animaltype.Name) != null)
            {
                animaltype = null;
                return animaltype;
            }
            if (animaltype.TypeID == "")
            {
                int index = base.GetAll().Count;
                animaltype.TypeID = "AT" + index;
            }
            await base.CreateAsync(animaltype);
            return animaltype;
        }
    }
}
