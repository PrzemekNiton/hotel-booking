using BookingAPI.Entities;

namespace BookingAPI.Services
{
	public interface IHotelService
	{
        Task<List<Hotel>?> GetHotelsAsync(
            string? name,
            DateTime? dateStart, DateTime? dateEnd, int? guests, int? customerId);

        Task<Hotel?> GetHotelAsync(int id, int? customerId);
    }
}

