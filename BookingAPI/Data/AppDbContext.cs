using BookingAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace BookingAPI.Data
{
	public class AppDbContext : DbContext
	{
		public AppDbContext(DbContextOptions<AppDbContext> options)
			: base(options)
		{
		}

        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<Reservation> Reservations { get; set; }
        public virtual DbSet<Hotel> Hotels { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
		{
            // Define relationship between reservations and customers
            builder.Entity<Reservation>()
                .HasOne(p => p.Customer)
                .WithMany(p => p.Reservations)
                .HasForeignKey(p => p.CustomerId);

            // Define relationship between hotels and reservations
            builder.Entity<Reservation>()
                .HasOne(p => p.Hotel)
                .WithMany(p => p.Reservations)
                .HasForeignKey(p => p.HotelId);
        }
    }
}

