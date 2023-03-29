namespace BookingAPI.Models
{
	public class SearchHotelParams
	{
        public string? Name { get; set; }
		public DateTime? DateStart { get; set; }
		public DateTime? DateEnd { get; set; }
		public int? Guests { get; set; }
		public int? CustomerId { get; set; }
    }
}

