using Microsoft.EntityFrameworkCore;
using Repositories.Model;
using Helper.Objects;
using Helper;

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
    public async Task<string> SetScheduleAsync(DateTime bookingDate, string employeeID){
        ScheduleRepository schrepo = new ScheduleRepository(_context);
        DateOnly date = DateOnly.Parse(bookingDate.ToString("yyyy-MM-dd"));
        Schedule? schedule = await schrepo.CheckValidDateAsync(date, employeeID);
        if( schedule == null ){
            schedule = new Schedule();
            schedule.EmployeeID = employeeID;
            schedule.Date = date;
            await schrepo.GenerateVetScheduleAsync(schedule);
        }
        schedule.Slot = schrepo.SlotByTime(bookingDate);
        if( schedule.Slot == 0 )
            return "Outside working hour";
        schedule = await schrepo.SearchSpecificSlotAsync(employeeID, date, schedule.Slot);
        if( schedule == null )
            return "Cannot get the schedule";
        if( schedule.SlotStatus == false )
            return "Cannot place order on this slot";

        schedule.SlotStatus = false;
        schedule = await schrepo.UpdateSlotAsync(schedule);
        if( schedule == null )
            return "Cannot update slot status";
        return schedule.ScheduleID;
    }

    public async Task<string> AddNewBooking(NewBookingInformation info ){
        var transaction = _context.Database.BeginTransactionAsync();
        string result = "";
        Booking newOrder = new Booking();
        try{
            result = info.IsEmpty();
            if( result != "Ok" )
                return result;

            Customer? customer = await (new CustomerRepository(_context)).GetByIdAsync(info.CustomerID);
            if( customer == null )
                return result = "Customer does not exist";

            Employee? employee = await (new EmployeeRepository(_context)).GetByIdAsync(info.EmployeeID);
            if( employee == null )
                return result = "Employee does not exist";

            Service? service = await (new ServiceRepository(_context)).GetByIdAsync(info.ServiceID);
            if(service == null)
                return result = "Cannot detemined the delivery method of the service";

            if( info.BookingDate < DateTime.Now.AddDays(2) || info.BookingDate >= DateTime.Now.AddDays(21) )
                return "Cannot place an booking order with that date";

            newOrder.CustomerID = info.CustomerID;
            newOrder.EmployeeID = info.EmployeeID;
            newOrder.BookingDate = info.BookingDate;
            newOrder.ExpiredDate = info.BookingDate.AddHours(2);
            newOrder.NumberOfFish = info.NumberOfFish;
            newOrder.IncidentalFish = 0;
            newOrder.ServiceDeliveryMethodID = info.SDM;
            newOrder.BookingAddress = info.BookingAddress;
            newOrder.Distance = 0;
            newOrder.DistanceCost = 0;
            newOrder.TotalServiceCost = 0;
            newOrder.Status = Constants.Customer.WaitingForPayment;
            newOrder.PaymentMethod = "Bank Transfer";
            newOrder.PaymentStatus = "Pending";

            string temp = await SetScheduleAsync(info.BookingDate, info.EmployeeID);
            switch (temp){
                case "Outside working hour":
                case "Cannot get the schedule":           
                case "Cannot place order on this slot":
                case "Cannot update slot status":
                    return result = temp;
                default:
                    newOrder.ScheduleID = temp;
                    break;
            }

            FeedbackRepository feedbackRepo = new FeedbackRepository(_context);
            newOrder.FeedbackID = (await feedbackRepo.SaveAndGetFeedbackAsync(new Feedback(){Status = "Uncommented"})).FeedbackID;

            int index = base.GetAllAsync().Result.Count;
            newOrder.BookingID = "B" + index;

            if( await base.CreateAsync(newOrder) == 0 )
                return result = "Unable to create new booking order";

            BookingDetail detail = new BookingDetail(){BookingDetailID = "", BookingID = newOrder.BookingID, ServiceID = info.ServiceID };
            await (new BookingDetailRepository(_context)).AddBookingDetailAsync(detail, info.ServiceID); 
            await transaction.Result.CommitAsync();
            return result = newOrder.BookingID;
        } finally {
            if( result != newOrder.BookingID )
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

