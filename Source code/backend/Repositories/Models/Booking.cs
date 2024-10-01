﻿using System.ComponentModel.DataAnnotations.Schema;
namespace Repositories.Models;

[Table("Booking")]
public class Booking
{

    public string BookingID { get; set; }

    public string CustomerID { get; set; }

    public string EmployeeID { get; set; }

    public DateTime BookingDate { get; set; } 

    public DateOnly ExpiredDate { get; set; }

    public decimal Deposit { get; set; }

    public string ServiceDeliveryMethodID { get; set; }

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