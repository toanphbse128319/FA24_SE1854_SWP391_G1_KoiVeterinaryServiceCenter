using Microsoft.EntityFrameworkCore;
using Repositories.Model;

namespace Repositories.Repository
{
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

        public async Task<string> AddNewBooking(Booking info){
            if( info.CustomerID == null || info.EmployeeID == null || info.ServiceDeliveryMethodID == null ||
                info.BookingAddress == null || info.FeedbackID == null || info.ScheduleID == null )
                return "Parameters cannot be null";
            
            if( info.CustomerID.Count() == 0 || info.EmployeeID.Count() == 0 || info.ServiceDeliveryMethodID.Count() == 0 ||
                info.BookingAddress.Count() == 0 || info.FeedbackID.Count() == 0 || info.ScheduleID.Count() == 0)
                return "Parameteres cannot be empty";

            if( info.BookingDate < DateTime.Now.AddDays(1) || info.BookingDate > DateTime.Now.AddDays(21) )
                return "Cannot place an booking order with that date";

            Customer? customer = await (new CustomerRepository(_context)).GetByIdAsync(info.CustomerID);
            if( customer == null )
                return "Customer does not exist";

            Employee employee = await (new EmployeeRepository(_context)).GetByIdAsync(info.EmployeeID);
            if( employee == null )
                return "Employee does not exist";

            ServiceDeliveryMethod sdm = await (new ServiceDeliveryMethodRepository(_context)).GetByIdAsync(info.ServiceDeliveryMethodID);
            if( sdm == null )
                return "Cannot detemined the delivery method of the service";

            await (new FeedbackRepository(_context)).SaveFeedbackAsync(new Feedback(){Status = "Uncommented"});

            Schedule schedule = await (new ScheduleRepository(_context)).GetByIdAsync(info.ScheduleID);
            if( schedule == null ){
                
            }

            int index = base.GetAllAsync().Result.Count;
            info.BookingID = "B" + index;
             
            TimeSpan remainingTime = (info.BookingDate - DateTime.Now) / 2;
            info.ExpiredDate = DateTime.Now.Add(remainingTime);
        }

    }
}
