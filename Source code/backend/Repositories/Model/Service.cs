#nullable disable
using System.ComponentModel.DataAnnotations.Schema;

[Table("Service")]
public class Service {

    public string ServiceID { get; set; }
    public string ServiceDeliveryMethodID { get; set; }
    public string Name { get; set; }
    public Decimal Price { get; set; }
    public string Description { get; set; }
    public string Status { get; set; }

}
