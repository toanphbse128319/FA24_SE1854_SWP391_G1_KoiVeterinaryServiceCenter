using Repositories.Model;

namespace Repositories.Repository;

public class AnimalProfileRepository : GenericRepository<AnimalProfile>
{
    public AnimalProfileRepository(Context context)
    {
        _context = context;
    }

    public bool IsDuplicate( AnimalProfile target ){
        AnimalProfile? temp = _context.AnimalProfiles.FirstOrDefault( profile => profile.Name == target.Name &&
                                                                  profile.TypeID == target.TypeID &&
                                                                  profile.Size == target.Size &&
                                                                  profile.Age == target.Age &&
                                                                  profile.Color == target.Color &&
                                                                  profile.Description == target.Description &&
                                                                  profile.Sex == target.Sex &&
                                                                  profile.Picture == target.Picture ); 

        if( temp == null )
            return false;
        return true;
    }

    public async Task<string> AddAnimalProfileAsync(AnimalProfile animalprofile)
    {
        if (animalprofile == null)
            return "Invalid: ID cannot be null";
        AnimalTypeRepository _repo = new(_context);
        if (await _repo.GetByIdAsync(animalprofile.TypeID) == null)
            return "Invalid: Animal type not found!";
        if( base.GetById( animalprofile.AnimalProfileID ) != null )
            return "Invalid: Profile already exist";
        if (animalprofile.AnimalProfileID == "")
        {
            animalprofile.AnimalProfileID = GetNextID("AP");
        }
        await base.CreateAsync(animalprofile);;
        return animalprofile.AnimalProfileID;
    }

    //Return 1 if successfully add all and 0 if failed even a single one
    public async Task<string> AddAnimalProfilesAsync(IEnumerable<AnimalProfile> animalProfiles)
    {
        if( animalProfiles == null || animalProfiles.Count() == 0 )
            return "Invalid: animal profiles list cannot be empty";
        foreach (AnimalProfile animalProfile in animalProfiles)
        {
            string result = await AddAnimalProfileAsync( animalProfile );
            if( result.ToLower().Contains("invalid") )
                return result;
        }
        return "Success";
    }

}
