namespace BookingAPI.DTOs
{
	public class HotelDTO
	{
        public int Id { get; set; }
        
        public string? Name { get; set; }

        public string? Country { get; set; }

        public string? City { get; set; }

        public int Standard { get; set; }

        public decimal Price { get; set; }

        public string? Description { get; set; }

        public int FreePlaces { get; set; }

        public DateTime DateStart { get; set; }

        public DateTime DateEnd { get; set; }

        public List<ReservationDTO> Reservations { get; set; } = new List<ReservationDTO>();
    }
}

