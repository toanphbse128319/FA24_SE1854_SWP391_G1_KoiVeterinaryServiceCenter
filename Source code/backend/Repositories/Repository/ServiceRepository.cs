using Repositories;
using Repositories.Repository;
using Helper.Tools;

public class ServiceRepository : GenericRepository<Service>
{
    private async Task<bool> ValidSDMAsync( string sdmID ){
        return await (new ServiceDeliveryMethodRepository( _context ).ValidSDMAsync( sdmID ) );
    }

    public ServiceRepository(Context context)
        : base(context) { }

    public async Task<string> UpdateServiceAsync( Service service ){
        Service temp = await base.GetByIdAsync( service.ServiceID );
        if( temp == null )
            return "Cannot find the service to update";
        if( Validate.IsEmpty( service.Name ) == false )
            temp.Name = service.Name;
        if( Validate.IsEmpty( service.Status ) == false )
            temp.Status = service.Status;
        if( Validate.IsEmpty( service.Description ) == false )
            temp.Description = service.Description;
        if( Validate.IsEmpty( service.ServiceDeliveryMethodID ) == false )
            temp.ServiceDeliveryMethodID = service.ServiceDeliveryMethodID;
        if( await ValidSDMAsync( service.ServiceDeliveryMethodID ) == false ) 
            return "Failed to determined the service delivery method";
        if( service.Price != 0 )
            temp.Price = service.Price;
        if( await base.UpdateAsync( temp ) > 0 )
            return "Update success";
        return "Failed to update";
    }

    public async Task<string> NewServiceAsync( Service service ){
        if( Validate.IsEmpty( service.ServiceDeliveryMethodID ) )
            return "Service delivery method cannot be empty";
        if( await ValidSDMAsync( service.ServiceDeliveryMethodID ) == false ) 
            return "Failed to determined the service delivery method";
        if( Validate.IsEmpty( service.Name ) )
            return "Service name cannot be empty";
        if( service.Price <= 0 )
            return "Service price cannot be lower than 1";
        service.ServiceID = base.GetNextID( "S" );
        if( await base.CreateAsync( service ) > 0 )
            return "Added successfully";
        return "Failed to add the service";
    }

    public async Task<string> AddOrUpdateService( Service service ){
        if( Validate.IsEmpty( service.ServiceID ) )
            return await NewServiceAsync( service );
        return await UpdateServiceAsync( service );
    }
}
