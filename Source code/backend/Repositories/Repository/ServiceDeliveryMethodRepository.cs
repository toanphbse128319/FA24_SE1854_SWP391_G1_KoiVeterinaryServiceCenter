namespace Repositories.Repository;

public class ServiceDeliveryMethodRepository : GenericRepository<ServiceDeliveryMethod>
{

    public ServiceDeliveryMethodRepository(Context context)
        : base(context)
    {
    }

    public async Task<bool> ValidSDMAsync( string sdmID ){
        ServiceDeliveryMethod temp = await base.GetByIdAsync( sdmID );
        if( temp == null )
            return false;
        return true;

    }
}

