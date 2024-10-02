using Microsoft.EntityFrameworkCore;
using Repositories.Model;

namespace Repositories.Data
{
    public class BookingContext : DbContext 
    {
        public BookingContext(DbContextOptions<BookingContext> options)
        : base(options)
        {
        }
        public DbSet<Booking> Bookings { get; set; }
    }
}
