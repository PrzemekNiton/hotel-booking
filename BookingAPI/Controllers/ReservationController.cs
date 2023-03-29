using AutoMapper;
using BookingAPI.DTOs;
using BookingAPI.Entities;
using BookingAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookingAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationController : ControllerBase
	{
        private readonly IMapper _mapper;
        private readonly IReservationService _reservationService;

		public ReservationController(IReservationService reservationService, IMapper mapper)
		{
			_reservationService = reservationService;
            _mapper = mapper;
        }

		[HttpGet("list")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetReservationsList()
		{
			var reservations = await _reservationService.GetReservationsAsync();

			if (reservations == null)
			{
                return StatusCode(StatusCodes.Status204NoContent, "No Reservations in database.");
            }

			var mapReservations = _mapper.Map<List<ReservationDTO>>(reservations);

            return StatusCode(StatusCodes.Status200OK, mapReservations);
		}

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetReservation(int id)
        {
            var reservation = await _reservationService.GetReservationAsync(id);

            if (reservation == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, "No Reservation in database.");
            }

            var mapReservation = _mapper.Map<ReservationDTO>(reservation);

            return StatusCode(StatusCodes.Status200OK, mapReservation);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AddReservation(Reservation reservation)
        {
            var mapReservation = _mapper.Map<ReservationDTO>(reservation);

            var newReservation = await _reservationService.AddReservationAsync(mapReservation);

            if (newReservation == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Reservation could not be added.");
            }

            return CreatedAtAction("GetReservation", new { id = reservation.Id }, reservation);
        }
	}
}

