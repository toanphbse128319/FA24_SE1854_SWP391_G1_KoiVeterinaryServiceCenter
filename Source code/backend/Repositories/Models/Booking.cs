namespace Repositories.Models;

public class Booking
{
    private String _bookingID;
    private String? _customerID;
    private String? _employeeID;
    private DateTime _bookingDate;
    private DateTime _expiredDate;
    private int _deposit;
    private String _serviceDeliveryMethodID;
    private float? _vat;
    private String _bookingAddress;
    private float _distance;
    private int _distanceCost;
    private int _totalServiceCost;
    private String _status;
    private String _feedbackID;
    private String _scheduleID;
    private String? _note;
    private String _paymentMethod;
    private String _paymentStatus;

    public Booking(string BookingID, string? CustomerID, string? EmployeeID, DateTime BookingDate, DateTime ExpiredDate, int Deposit, string ServiceDeliveryMethodID, float? Vat, string BookingAddress, float Distance, int DistanceCost, int TotalServiceCost, string Status, string FeedbackID, string ScheduleID, string? Note, string PaymentMethod, string PaymentStatus)
    {
        _bookingID = BookingID;
        _customerID = CustomerID;
        _employeeID = EmployeeID;
        _bookingDate = BookingDate; //Co the lay thoi gian thuc bang ham j do?
        _expiredDate = ExpiredDate;  // = BookingDate + ?
        _deposit = Deposit;
        _serviceDeliveryMethodID = ServiceDeliveryMethodID;
        _vat = Vat;
        _bookingAddress = BookingAddress;
        _distance = Distance;
        _distanceCost = DistanceCost;
        _totalServiceCost = TotalServiceCost;
        _status = Status;
        _feedbackID = FeedbackID;
        _scheduleID = ScheduleID;
        _note = Note;
        _paymentMethod = PaymentMethod;
        _paymentStatus = PaymentStatus;
    }

    public string BookingId { get; set; }

    public string CustomerId { get; set; }

    public string EmployeeId { get; set; }

    public DateTime BookingDate { get; set; } 

    public DateOnly ExpiredDate { get; set; }

    public decimal Deposit { get; set; }

    public string DeliveryMethod { get; set; }

    public double? Vat { get; set; }

    public string BookingAddress { get; set; }

    public double Distance { get; set; }

    public decimal DistanceCost { get; set; }

    public decimal TotalServiceCost { get; set; }

    public string Status { get; set; }

    public string FeedbackId { get; set; }

    public string ScheduleId { get; set; }

    public string Note { get; set; }

    public string PaymentMethod { get; set; }

    public string PaymentStatus { get; set; }
}