namespace BookingAPI.DTOs
{
	public class ReservationDTO
	{
        public int Id { get; set; }

        public int CustomerId { get; set; }

        public int HotelId { get; set; }

        public DateTime DateStart { get; set; }

        public DateTime DateEnd { get; set; }

        public decimal Amount { get; set; }

        public bool IsPayed { get; set; } = false;

        public CustomerDTO? Customer { get; set; }

        public HotelDTO? Hotel { get; set; }
    }
}

