#nullable disable
using System.ComponentModel.DataAnnotations.Schema;

namespace Repositories.Model;
[Table("BookingDetail")]
public class BookingDetail
{
    
    public string BookingDetailID { get; set; }
    public string BookingID { get; set; }
    public string ServiceID { get; set; }
    public decimal UnitPrice { get; set; }
    public bool Incidental {  get; set; }
    public string NoteResult { get; set; }
    public string AnimalStatusDescription { get; set; }
    public string ConsultDoctor { get; set; } 
    public string DrugList { get; set; } 
    public string PoolStatusDescription { get; set; }
    public string ConsultTechnician { get; set; } 
    public string MaterialList { get; set; } 

}
