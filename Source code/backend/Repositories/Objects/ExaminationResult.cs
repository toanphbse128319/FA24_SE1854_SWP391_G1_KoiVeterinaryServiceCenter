#nullable disable
using Repositories.Model;

namespace Repositories.Objects;

public class ExaminationResult{
    public List<BookingDetail> BookingDetails{ get; set; }
    public List<AnimalProfile> AnimalProfiles{ get; set; }
    public List<PoolProfile>   PoolProfiles  { get; set; }

    public bool IsNullOrEmpty(){
        if( BookingDetails == null || BookingDetails.Count() == 0 )
            return true;
        return false;
    }
}
