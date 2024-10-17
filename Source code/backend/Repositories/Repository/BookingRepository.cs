﻿using Microsoft.EntityFrameworkCore;
using Repositories.Model;

namespace Repositories.Repository;
public class BookingRepository : GenericRepository<Booking>
{

    public BookingRepository(Context context)
    {

        _context = context;
    }

    public Task<List<Booking>> GetVetBookingsAsync(string id)
    {
        return _context.Bookings.Where(booking => booking.EmployeeID.ToLower() == id.ToLower() && booking.BookingDate.Date >= DateTime.Today.Date).ToListAsync();
    }

    public async Task<int> UpdateStatusAsync(string id, string msg)
    {
        Booking booking = await base.GetByIdAsync(id);
        if (booking == null)
        {
            return 0;
        }
        else
        {
            booking.Status = msg;
            return await _context.SaveChangesAsync();;
        }
    }

    /*
     * this will generate Schedule if there's no schedule at the time of booking
     * or will update the slot status to false if the slot is available
     */
    public async Task<string> SetScheduleAsync(Booking info){
        ScheduleRepository schrepo = new ScheduleRepository(_context);
        DateOnly date = DateOnly.Parse(info.BookingDate.ToString("yyyy-MM-dd"));
        Schedule? schedule = await schrepo.CheckValidDateAsync(date, info.EmployeeID);
        if( schedule == null ){
            schedule = new Schedule();
            schedule.EmployeeID = info.EmployeeID;
            schedule.Date = date;
            await schrepo.GenerateVetScheduleAsync(schedule);
        }
        schedule.Slot = schrepo.SlotByTime(info.BookingDate);
        if( schedule.Slot == 0 )
            return "Outside working hour";
        schedule = await schrepo.SearchSpecificSlotAsync(info.EmployeeID, date, schedule.Slot);
        if( schedule == null )
            return "Cannot get the schedule";
        if( schedule.SlotStatus == false )
            return "Cannot place order on this slot";

        schedule.SlotCapacity = info.NumberOfFish;
        schedule.SlotStatus = false;
        schedule = await schrepo.UpdateSlotAsync(schedule);
        if( schedule == null )
            return "Cannot update slot status";
        return schedule.ScheduleID;
    }

    public async Task<string> AddNewBooking(Booking info, string ServiceID){
        var transaction = _context.Database.BeginTransactionAsync();
        string result = "";
        try{
            if( info.CustomerID == null || info.EmployeeID == null || info.BookingAddress == null )
                return result = "Parameters cannot be null";

            if( info.CustomerID.Count() == 0 || info.EmployeeID.Count() == 0 ||
                    info.NumberOfFish == 0 || info.BookingAddress.Count() == 0 )
                return result = "Parameters cannot be empty";

            if( info.BookingDate < DateTime.Now.AddDays(1) || info.BookingDate > DateTime.Now.AddDays(21) )
                return result = "Cannot place an booking order with that date";

            Customer? customer = await (new CustomerRepository(_context)).GetByIdAsync(info.CustomerID);
            if( customer == null )
                return result = "Customer does not exist";

            Employee employee = await (new EmployeeRepository(_context)).GetByIdAsync(info.EmployeeID);
            if( employee == null )
                return result = "Employee does not exist";

            Service service = await (new ServiceRepository(_context)).GetByIdAsync(ServiceID);
            if(service == null)
                return result = "Cannot detemined the delivery method of the service";
            info.ServiceDeliveryMethodID = service.ServiceDeliveryMethodID;


            FeedbackRepository feedbackRepo = new FeedbackRepository(_context);
            info.FeedbackID = (await feedbackRepo.SaveAndGetFeedbackAsync(new Feedback(){Status = "Uncommented"})).FeedbackID;

            info.IncidentalFish = 0;

            string temp = await SetScheduleAsync(info);
            switch (temp){
                case "Outside working hour":
                case "Cannot get the schedule":           
                case "Cannot place order on this slot":
                case "Cannot update slot status":
                    return result = temp;
                default:
                    info.ScheduleID = temp;
                    break;
            }

            int index = base.GetAllAsync().Result.Count;
            info.BookingID = "B" + index;

            TimeSpan remainingTime = (info.BookingDate - DateTime.Now) / 2;
            info.ExpiredDate = DateTime.Now.Add(remainingTime);

            info.Status = "Waiting for Payment";
            info.PaymentStatus = "Pending";

            if( await base.CreateAsync(info) == 0 )
                return result = "Unable to create new booking order";

            BookingDetail detail = new BookingDetail(){BookingDetailID = "", BookingID = info.BookingID, ServiceID = ServiceID };
            await (new BookingDetailRepository(_context)).AddBookingDetailAsync(detail, ServiceID); 
            await transaction.Result.CommitAsync();
            return result = info.BookingID;
        } finally {
            if( result != info.BookingID )
                await transaction.Result.RollbackAsync();
        }
    }

    public async Task<Decimal> GetTotalPrice(string bookingID, int numberOfFish){
        BookingDetailRepository bdRepo = new BookingDetailRepository(_context);
        List<BookingDetail?> details = await bdRepo.GetByBookingID(bookingID);
        if( details == null || details.Count == 0 )
            return 0;
        Decimal total = 0;
        foreach(BookingDetail? detail in details){
            if( detail == null )
                break;
            total += detail.UnitPrice * numberOfFish;
        }
        return total;
    }
}

