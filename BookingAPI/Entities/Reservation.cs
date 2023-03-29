using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookingAPI.Entities
{
    [Table("Rezerwacje")]
    public class Reservation
	{
        [Key]
        [Column("ID_Rezerwacji")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("ID_Klienta")]
        [Required]
        public int CustomerId { get; set; }

        [Column("ID_Hotelu")]
        [Required]
        public int HotelId { get; set; }

        [Column("Start")]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [DataType(DataType.Date)]
        [Required]
        public DateTime DateStart { get; set; }

        [Column("Koniec")]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [DataType(DataType.Date)]
        [Required]
        public DateTime DateEnd { get; set; }

        [Column("Kwota", TypeName = "decimal(18,4)")]
        [Required]
        public decimal Amount { get; set; }

        [Column("Oplacone")]
        [Required]
        public bool IsPayed { get; set; } = false;

        
        // One-to-one relation with customer and hotel
        public Customer? Customer { get; set; }
        public Hotel? Hotel { get; set; }
    }
}

