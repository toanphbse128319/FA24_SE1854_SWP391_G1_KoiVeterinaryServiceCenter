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

    public async Task<string> GetServicedType( string sdmID ){
        ServiceDeliveryMethod temp = await base.GetByIdAsync( sdmID );
        if( temp == null )
            return "Invalid: Failed to determined the service delivery method";
        
        if( temp.Name.ToLower().Contains("hồ") )
            return "pool";
        else if( temp.Name.ToLower().Contains("trực tuyến") )
            return "online";
        return "fish";
    }
}

