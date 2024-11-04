#nullable disable
namespace Helper.Objects;

public class NewBookingInformation(){
    public string CustomerID{ get; set; }
    public string EmployeeID{ get; set; }
    public string ServiceID{ get; set; }
    public string ServiceDeliveryMethodID { get; set; }
    public DateTime BookingDate{ get; set; }
    public int NumberOfFish{ get; set; }
    public int NumberOfPool{ get; set; }
    public string BookingAddress{ get; set; }
    public Decimal DistanceCost{ get; set; }
    public Decimal TotalServiceCost{ get; set; }
    public float Distance{ get; set; }

    public string IsNull(){
        if( CustomerID == null )
            return "Customer id cannot be null";
        if( ServiceID == null )
            return "Service id cannot be null";
        if( BookingAddress == null )
            return "Booking address cannot be null";
        return "Ok";
    }

    public string IsEmpty(){
        string result = IsNull();
        if( result != "Ok" )
            return result;
        if( CustomerID.Count() == 0 )
            return "Customer id cannot be empty";
        if( EmployeeID == null || EmployeeID.Count() == 0 )
            EmployeeID = "E0";
        if( ServiceID.Count() == 0 )
            return "Service id cannot be empty";
        if( BookingAddress.Count() == 0 )
            return "Booking address cannot be empty";
        if( NumberOfPool <= 0 && NumberOfFish <= 0 )
            return "Both number of fish and pool cannot be lower than 1";
        if( NumberOfFish < 0 )
            return "Number of fishs cannot be lower than 0";
        if( NumberOfPool < 0 )
            return "Number of pools cannot be lower than 0";
        if( TotalServiceCost <= 0 )
            return "Total service cost cannot be lower than 1";
        return "Ok";
        
    }
}
