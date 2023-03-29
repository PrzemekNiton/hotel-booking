using BookingAPI.Data;
using BookingAPI.Entities;
using BookingAPI.Utils;
using Microsoft.EntityFrameworkCore;

namespace BookingAPI.Services
{
    public class HotelService : IHotelService
    {
        private readonly AppDbContext _db;

        public HotelService(AppDbContext db)
        {
            _db = db;
        }

        public async Task<List<Hotel>?> GetHotelsAsync(
            string? name, DateTime? dateStart, DateTime? dateEnd, int? guests, int? customerId)
        {
            var predicate = PredicateBuilder.True<Hotel>();

            try
            {
                if (!string.IsNullOrEmpty(name))
                {
                    predicate = predicate.And(p => p.Name.Contains(name));
                }

                if (dateStart != null && dateEnd != null)
                {
                    predicate = predicate.And(p => p.DateStart >= dateEnd && p.DateEnd <= dateEnd);
                }

                if (guests != null && guests > 0)
                {
                    predicate = predicate.And(p => p.FreePlaces >= guests);
                }

                if (customerId != null && customerId > 0)
                {
                    return await _db.Hotels
                        .Include(i => i.Reservations.Where(p => p.CustomerId == customerId))
                        .Where(predicate)
                        .ToListAsync();
                }
                else
                {
                    return await _db.Hotels.Where(predicate).ToListAsync();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<Hotel?> GetHotelAsync(int id, int? customerId)
        {
            try
            {
                if (customerId != null && customerId > 0)
                {
                    return await _db.Hotels
                        .Include(i => i.Reservations.Where(p => p.CustomerId == customerId))
                        .FirstOrDefaultAsync(p => p.Id == id);
                }
                else
                {
                    return await _db.Hotels.FirstOrDefaultAsync(p => p.Id == id);
                }
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}

