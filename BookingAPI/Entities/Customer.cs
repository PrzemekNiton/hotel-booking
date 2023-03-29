using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookingAPI.Entities
{
    [Table("Klienci")]
    public class Customer
	{
        [Key]
        [Column("ID")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("Imie")]
        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; } = "";

        [Column("Nazwisko")]
        [Required]
        [MaxLength(100)]
        public string LastName { get; set; } = "";

        [Column("Mail")]
        [Required]
        [MaxLength(300)]
        public string Mail { get; set; } = "";

        [Column("Telefon")]
        [Required]
        public int Phone { get; set; }

        [Column("Haslo")]
        [Required]
        [MaxLength(100)]
        public string Password { get; set; } = "";

        // One-to-many relationship with reservations
        public List<Reservation> Reservations { get; set; } = new List<Reservation>();
    }
}

