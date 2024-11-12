#nullable disable
using Repositories.Model;

namespace Repositories.Objects;

public class Profiles
{

    public List<AnimalProfile> AnimalProfiles { get; set; }
    public List<PoolProfile> PoolProfiles { get; set; }
    public BookingDetail BookingDetail { get; set; }
}
