using Microsoft.EntityFrameworkCore;
using Repositories.Models;

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
