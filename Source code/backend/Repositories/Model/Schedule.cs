﻿#nullable disable
using System.ComponentModel.DataAnnotations.Schema;
namespace Repositories.Model;

[Table("Schedule")]
public class Schedule
{   
    public string ScheduleID { get; set; }
    public string EmployeeID { get; set; }
    public DateOnly Date { get; set; }
    public string Note { get; set; }
    public string Status { get; set; }
}

