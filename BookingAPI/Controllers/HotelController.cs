using AutoMapper;
using BookingAPI.Models;
using BookingAPI.DTOs;
using BookingAPI.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace BookingAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HotelController : ControllerBase
	{
        private readonly IMapper _mapper;
        private readonly IHotelService _hotelService;

		public HotelController(IHotelService hotelService, IMapper mapper)
		{
			_hotelService = hotelService;
			_mapper = mapper;
		}

        [HttpPost("list")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetHotelsList(
			[FromBody] SearchHotelParams searchParams)
		{
			var hotels = await _hotelService.GetHotelsAsync(
					searchParams.Name,
					searchParams.DateStart,
					searchParams.DateEnd,
					searchParams.Guests,
					searchParams.CustomerId);

			if (hotels == null)
			{
                return StatusCode(StatusCodes.Status204NoContent, "No Hotels in database.");
            }

			var mapHotels = _mapper.Map<List<HotelDTO>>(hotels);

            return StatusCode(StatusCodes.Status200OK, mapHotels);
        }

		[HttpGet("{id}/{customerId}")]
		public async Task<IActionResult> GetHotelAsync(int id, int? customerId)
		{
			var hotel = await _hotelService.GetHotelAsync(id, customerId);

			if (hotel == null)
			{
                return StatusCode(StatusCodes.Status204NoContent, "No Hotel in database.");
            }

            var mapHotel = _mapper.Map<HotelDTO>(hotel);

            return StatusCode(StatusCodes.Status200OK, mapHotel);
        }
	}
}

