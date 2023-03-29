using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookingAPI.Entities
{
    [Table("Hotele")]
	public class Hotel
	{
        [Key]
        [Column("ID")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("Nazwa")]
        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = "";

        [Column("Kraj")]
        [Required]
        [MaxLength(100)]
        public string Country { get; set; } = "";

        [Column("Miasto")]
        [Required]
        [MaxLength(100)]
        public string City { get; set; } = "";

        [Column("Standard")]
        [Required]
        public int Standard { get; set; }

        [Column("Cena", TypeName = "decimal(18,4)")]
        [Required]
        public decimal Price { get; set; }

        [Column("OpisOferty")]
        [Required]
        [MaxLength]
        public string Description { get; set; } = "";

        [Column("WolneMiejsca")]
        [Required]
        public int FreePlaces { get; set; }

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

        // One-to-many relationship with reservations
        public List<Reservation> Reservations { get; set; } = new List<Reservation>();
    }
}

