namespace Repositories.Models;

public class BookingDetail
{
    
    public string BookingDetailID { get; set; } = string.Empty;
    public string BookingID { get; set; } = string.Empty;
    public string ServiceID { get; set; } = string.Empty;
    public decimal UnitPrice { get; set; }
    public string NoteResult { get; set; } = string.Empty;
    public string NoteExamination { get; set; } = string.Empty;
    public string AnimalStatusDescription { get; set; } = string.Empty;
    public string ConsultDoctor { get; set; } = string.Empty;
    public string DrugList { get; set; } = string.Empty;
    public string PoolStatusDescription { get; set; } = string.Empty;
    public string ConsultTechnician { get; set; } = string.Empty;
    public string MaterialList { get; set; } = string.Empty;

}
