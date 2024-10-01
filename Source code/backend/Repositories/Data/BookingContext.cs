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
        DbSet<Booking> Bookings { get; set; }
    }
}
