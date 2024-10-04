#nullable disable
using System.ComponentModel.DataAnnotations.Schema;

[Table("ServiceDeliveryMethod")]
public class ServiceDeliveryMethod {
    
    public string ServiceDeliveryMethodID { get; set; }
    public string Name { get; set; }
    public string Status { get; set; }

}
