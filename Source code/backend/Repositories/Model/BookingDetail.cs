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
    public bool IsIncidental {  get; set; }
    public string NoteResult { get; set; }
    public string ExaminationResult { get; set; }
    public string VetConsult { get; set; }
    public string Formulary { get; set; }

}
