#nullable disable
namespace Helper.Objects;

public class NewBookingInformation(){
    public string CustomerID{ get; set; }
    public string EmployeeID{ get; set; }
    public string ServiceID{ get; set; }
    public DateTime BookingDate{ get; set; }
    public int NumberOfFish{ get; set; }
    public string SDM{ get; set; }
    public string BookingAddress{ get; set; }

    public string IsNull(){
        if( CustomerID == null )
            return "Customer id cannot be null";
        if( EmployeeID == null )
            return "Employee id cannot be null";
        if( ServiceID == null )
            return "Service id cannot be null";
        if( SDM == null )
            return "SDM id cannot be null";
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
        if( SDM.Count() == 0 )
            return "SDM id cannot be empty";
        if( BookingAddress.Count() == 0 )
            return "Booking address cannot be empty";
        if( NumberOfFish == 0 )
            return "Number of fish cannot be lower than 1";
        return "Ok";
        
    }
}
