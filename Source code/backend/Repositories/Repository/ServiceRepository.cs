using Repositories;
using Repositories.Repository;

public class ServiceRepository : GenericRepository<Service> {

    public ServiceRepository( Context context )
        : base( context ){
    }

}
