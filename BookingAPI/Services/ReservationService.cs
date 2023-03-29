using BookingAPI.Data;
using BookingAPI.DTOs;
using BookingAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace BookingAPI.Services
{
	public class ReservationService : IReservationService
	{
        private readonly AppDbContext _db;

        public ReservationService(AppDbContext db)
		{
            _db = db;
		}

        public async Task<List<Reservation>?> GetReservationsAsync()
        {
            try
            {
                return await _db.Reservations
                    .Include(p => p.Customer)
                    .Include(p => p.Hotel)
                    .ToListAsync();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<Reservation?> GetReservationAsync(int id)
        {
            try
            {
                return await _db.Reservations
                    .Include(p => p.Customer)
                    .Include(p => p.Hotel)
                    .FirstOrDefaultAsync(p => p.Id == id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<Reservation?> AddReservationAsync(ReservationDTO reservation)
        {
            try
            {
                var newReservation = new Reservation
                {
                    CustomerId = reservation.CustomerId,
                    HotelId = reservation.HotelId,
                    DateStart = reservation.DateStart,
                    DateEnd = reservation.DateEnd,
                    Amount = reservation.Amount,
                    IsPayed = reservation.IsPayed
                };

                await _db.Reservations.AddAsync(newReservation);
                await _db.SaveChangesAsync();

                return await _db.Reservations.FindAsync(newReservation.Id);
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}

