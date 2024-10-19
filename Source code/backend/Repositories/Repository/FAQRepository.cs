using Repositories.Model;

namespace Repositories.Repository;

public class FAQRepository : GenericRepository<FAQ>
{

    public FAQRepository(Context context)
        : base(context)
    {

    }

}
