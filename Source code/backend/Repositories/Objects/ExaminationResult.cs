#nullable disable
using Repositories.Model;

namespace Repositories.Objects;

public class ExaminationResult{
    public List<BookingDetail> BookingDetail{ get; set; }
    public List<AnimalProfile> AnimalProfile{ get; set; }
    public List<PoolProfile>   PoolProfile  { get; set; }
}
