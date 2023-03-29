namespace BookingAPI.DTOs
{
	public class CustomerDTO
	{
        public int Id { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? Mail { get; set; }

        public int Phone { get; set; }

        public List<ReservationDTO> Reservations { get; set; } = new List<ReservationDTO>();
    }
}

