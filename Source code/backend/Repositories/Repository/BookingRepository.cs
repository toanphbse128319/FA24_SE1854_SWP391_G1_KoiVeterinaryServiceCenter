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

    public async Task<List<Booking>> GetByProfileID( string id ){
        if( id.Contains( 'C' ) || id.Contains('c') )
            return await _context.Bookings.Where( order => order.CustomerID == id ).ToListAsync();
        return await _context.Bookings.Where( order => order.EmployeeID == id ).ToListAsync();
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
            return await UpdateAsync( booking );
        }
    }

    /*
     * this will generate Schedule if there's no schedule at the time of booking
     * or will update the slot status to false if the slot is available
     */
    public async Task<string> SetScheduleAsync(DateTime bookingDate, string employeeID, string note){
        ScheduleRepository schrepo = new ScheduleRepository(_context);
        DateOnly date = DateOnly.Parse(bookingDate.ToString("yyyy-MM-dd"));
        Schedule? schedule = await schrepo.CheckValidDateAsync(date, employeeID);
        if( schedule == null )
            return "Cannot get the schedule";
        SlotTableRepository slotManager = new SlotTableRepository(_context);
        SlotTable? slot = new SlotTable();
        int slotNo = slotManager.SlotByTime(bookingDate.Hour);
        if( slotNo == 0 )
            return "Outside working hour";
        Console.WriteLine(schedule.ScheduleID + ", " + slotNo);
        slot = await slotManager.SearchSpecificSlotAsync(schedule.ScheduleID, slotNo);
        if( slot == null )
            return "Cannot get the schedule";
        if( slot.SlotStatus == false )
            return "Cannot place order on this slot";
        slot = await slotManager.OrderSlotAsync(slotNo, schedule.ScheduleID, note);
        if( slot == null )
            return "Cannot update slot status";
        return schedule.ScheduleID;
    }

    public bool checkValidPrice( Service service, Decimal total, int number ){
        Console.WriteLine(service.Price * number + ", total: " + total);
        if( service.Price * number > total )
            return false;
        return true;
    }
    public async Task<string> AddNewBooking(NewBookingInformation info ){
        var transaction = _context.Database.BeginTransaction();
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
                return result = "Cannot determine the service";
            if( info.BookingDate < DateTime.Now.AddDays(1) || info.BookingDate >= DateTime.Now.AddDays(30) )
                return "Cannot place an booking order with that date";

            ServiceDeliveryMethod? sdm = await (new ServiceDeliveryMethodRepository(_context)).GetByIdAsync(service.ServiceDeliveryMethodID);
            if( sdm == null )
                return "Cannot determine the delivery method";

            int number = 0;
                if( info.NumberOfFish > 0 )
                    number = info.NumberOfFish;
                else number = info.NumberOfPool;
            if( checkValidPrice(service, info.TotalServiceCost, number ) == false ){
                return "Pricing is invalid, must be higher than " + service.Price * number ;
            }
                
            string? vat = Configuration.GetConfiguration()["Other:VAT"];
            if( vat == null )
                throw new Exception("Missing configuration in appsetting.json");

            newOrder.CustomerID = info.CustomerID;
            newOrder.EmployeeID = info.EmployeeID;
            newOrder.BookingDate = info.BookingDate;
            newOrder.ExpiredDate = info.BookingDate.AddHours(2);
            newOrder.NumberOfFish = info.NumberOfFish;
            newOrder.IncidentalFish = 0;
            newOrder.BookingAddress = info.BookingAddress;
            newOrder.Distance = info.Distance;
            newOrder.DistanceCost = info.DistanceCost;
            newOrder.TotalServiceCost = info.TotalServiceCost;
            newOrder.Status = "Pending";
            newOrder.PaymentMethod = "Bank Transfer";
            newOrder.PaymentStatus = "Pending";
            newOrder.Vat = float.Parse( vat );
            newOrder.NumberOfPool = info.NumberOfPool;
            newOrder.IncidentalPool = 0;
            string temp = await SetScheduleAsync(info.BookingDate, info.EmployeeID, sdm.Name);
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
            newOrder.FeedbackID = "FB0";
            newOrder.BookingID = GetNextID("B");
            if( await base.CreateAsync(newOrder) == 0 )
                return result = "Unable to create new booking order";
            BookingDetail detail = new BookingDetail(){BookingDetailID = "", BookingID = newOrder.BookingID, ServiceID = info.ServiceID };
            await (new BookingDetailRepository(_context)).AddBookingDetailAsync(detail); 
            transaction.Commit();
            return result = newOrder.BookingID;
        } finally {
            if( result != newOrder.BookingID )
                await transaction.RollbackAsync();
        }
    }

//    public async Task<Decimal> GetTotalPrice(string bookingID){
//        BookingDetailRepository bdRepo = new BookingDetailRepository(_context);
//        List<BookingDetail?> details = await bdRepo.GetByBookingID(bookingID);
//        if( details == null || details.Count == 0 )
//            return 0;
//        Booking info = await GetByIdAsync(bookingID);
//        if( info == null )
//            return 0;
//        if( info.Vat == null )
//            return 0;
//        int total = 0;
//        foreach(BookingDetail? detail in details){
//            if( detail == null )
//                break;
//            total += (int)(detail.UnitPrice * info.NumberOfFish);
//        }
//        total += (int)(info.Vat * total);
//        return total;
//    }

//    public async Task<Decimal> GetDepositPrice(string bookingID){
//        Booking info = await GetByIdAsync(bookingID);
//        if( info == null )
//            return 0;
//        info.Deposit = (int) GetTotalPrice(bookingID).Result * 30 / 100;
//        info.Status = Constants.Customer.WaitingForPayment + ": Deposit";
//        await UpdateAsync(info);
//        return info.Deposit;
//    }
    
    public async Task<string> CheckExpiration(string bookingID){
        Booking info = await GetByIdAsync(bookingID);
        if( info == null )
            return "Cannot find booking order";
        if( info.ExpiredDate < DateTime.Now )
            return "Payment expired";
        return "Payment pending";
    }

}

