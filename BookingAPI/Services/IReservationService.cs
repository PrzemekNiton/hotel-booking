using BookingAPI.DTOs;
using BookingAPI.Entities;

namespace BookingAPI.Services
{
	public interface IReservationService
	{
        Task<List<Reservation>?> GetReservationsAsync();

        Task<Reservation?> GetReservationAsync(int id);

        Task<Reservation?> AddReservationAsync(ReservationDTO reservation);
    }
}

