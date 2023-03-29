using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookingAPI.Models
{
	public class User
	{
        public User(string login, string firstName, string lastName)
        {
            Login = login;
            FirstName = firstName;
            LastName = lastName;
        }

        [Key]
		[Column("id")]
		public int Id { get; set; }

		[Column("login")]
		[Required]
		[MaxLength(100)]
		public string Login { get; set; }

        [Column("first_name")]
        [Required]
        [MaxLength(200)]
        public string FirstName { get; set; }

        [Column("last_name")]
        [Required]
        [MaxLength(200)]
        public string LastName { get; set; }

        [Column("job_name")]
        [MaxLength(100)]
        public string? JobName { get; set; }
	}
}

