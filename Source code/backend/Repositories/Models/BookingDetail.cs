namespace Repositories.Models;

public class BookingDetail
{
    private String _bookingDetailID;
    private String _bookingID;
    private String _serviceID;
    private String _unitPrice;
    private String? _noteResult;
    private String? _noteExamination;
    private String? _animalStatusDescription;
    private String? _consultDoctor;
    private String? _drugList;
    private String? _poolStatusDescription;
    private String? _consultTechnician;
    private String? _materialList;

    public BookingDetail(string BookingDetailID, string BookingID, string ServiceID, string UnitPrice, string? NoteResult, string? NoteExamination, string? AnimalStatusDescription, string? ConsultDoctor, string? DrugList, string? PoolStatusDescription, string? ConsultTechnician, string? MaterialList)
    {
        _bookingDetailID = BookingDetailID;
        _bookingID = BookingID;
        _serviceID = ServiceID;
        _unitPrice = UnitPrice;
        _noteResult = NoteResult;
        _noteExamination = NoteExamination;
        _animalStatusDescription = AnimalStatusDescription;
        _consultDoctor = ConsultDoctor;
        _drugList = DrugList;
        _poolStatusDescription = PoolStatusDescription;
        _consultTechnician = ConsultTechnician;
        _materialList = MaterialList;
    }

    public string BookingDetailID { get; set; }

    public string BookingID { get; set; }

    public string ServiceID { get; set; }

    public decimal UnitPrice { get; set; }

    public string NoteResult { get; set; }

    public string NoteExamination { get; set; }

    public string AnimalStatusDescription { get; set; }

    public string ConsultDoctor { get; set; }

    public string DrugList { get; set; }

    public string PoolStatusDescription { get; set; }

    public string ConsultTechnician { get; set; }

    public string MaterialList { get; set; }
}