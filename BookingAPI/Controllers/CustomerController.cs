using AutoMapper;
using BookingAPI.DTOs;
using BookingAPI.Entities;
using BookingAPI.Models;
using BookingAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookingAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ICustomerService _customerService;

		public CustomerController(ICustomerService customerService, IMapper mapper)
		{
            _customerService = customerService;
            _mapper = mapper;
		}

        [HttpGet("list")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetCustomersList()
        {
            var customers = await _customerService.GetCustomersAsync();

            if (customers == null)
            {
                return StatusCode(StatusCodes.Status204NoContent,
                    "No Customers in database.");
            }

            var mapCustomers = _mapper.Map<List<CustomerDTO>>(customers);

            return StatusCode(StatusCodes.Status200OK, mapCustomers);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetCustomer(int id)
        {
            var customer = await _customerService.GetCustomerAsync(id);

            if (customer == null)
            {
                return StatusCode(StatusCodes.Status204NoContent,
                    $"No Customer found for id: {id}.");
            }

            var mapCustomer = _mapper.Map<CustomerDTO>(customer);

            return StatusCode(StatusCodes.Status200OK, mapCustomer);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Customer>> AddCustomer(Customer customer)
        {
            var isEmailExist = await _customerService.CheckIsMailExist(customer.Mail);

            if (isEmailExist)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"{customer.Mail} is already exist in database.");
            }

            var dbCustomer = await _customerService.AddCustomerAsync(customer);

            if (dbCustomer == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"{customer.FirstName} could not be added.");
            }

            return CreatedAtAction("GetCustomer", new { id = customer.Id }, customer);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateCustomer(int id, Customer customer)
        {
            if (id != customer.Id)
            {
                return BadRequest();
            }

            var dbCustomer = await _customerService.UpdateCustomerAsync(customer);

            if (dbCustomer == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"{customer.FirstName} could not be updated.");
            }

            return NoContent();
        }

        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetCustomerAccess(
            [FromBody] AuthParams authParams)
        {
            var result = await _customerService.CustomerAccessAsync(authParams.Mail, authParams.Password);

            if (!result)
            {
                return StatusCode(StatusCodes.Status401Unauthorized); 
            }

            return StatusCode(StatusCodes.Status200OK);
        }
    }
}

