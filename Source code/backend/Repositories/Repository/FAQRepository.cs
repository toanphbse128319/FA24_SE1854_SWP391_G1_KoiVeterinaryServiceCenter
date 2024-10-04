using Repositories;
using Repositories.Repository;
using Repositories.Model;
public class FAQRepository : GenericRepository<FAQ>{

    public FAQRepository(Context context)
        : base(context){

    }

}
