using System.Net;
using AutoMapper;
using BookingAPI.Controllers;
using BookingAPI.DTOs;
using BookingAPI.Entities;
using BookingAPI.Models;
using BookingAPI.Profiles;
using BookingAPI.Services;
using BookingAPITests.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookingAPITests
{
	public class CustomerControllerTest
	{
		private readonly CustomerController _customerController;
		private readonly ICustomerService _customerService;
        private static IMapper? _mapper;

        public CustomerControllerTest()
		{
			if (_mapper == null)
			{
				var mapConfig = new MapperConfiguration(mc =>
				{
					mc.AddProfile(new CustomerProfile());
					mc.AddProfile(new HotelProfile());
					mc.AddProfile(new ReservationProfile());
				});
				_mapper = mapConfig.CreateMapper();
			}

			_customerService = new CustomerServiceFake();
			_customerController = new CustomerController(_customerService, _mapper);
		}

		[Fact]
		public async void Get_WhenCalled_ReturnsAllItems()
		{
			var result = await _customerController.GetCustomersList() as ObjectResult;
			var items = result?.Value;

			Assert.Equal(HttpStatusCode.OK, (HttpStatusCode)result.StatusCode);
            Assert.IsType<List<CustomerDTO>>(items);
        }

		[Fact]
		public async void Get_WhenCalled_ReturnOneItem()
		{
			var result = await _customerController.GetCustomer(1) as ObjectResult;
			var item = result?.Value;

			Assert.Equal(HttpStatusCode.OK, (HttpStatusCode)result.StatusCode);
			Assert.IsType<CustomerDTO>(item);
			Assert.Equal("jan.kowalski@wp.pl", (item as CustomerDTO).Mail);
        }

		[Fact]
		public async void Post_WhenCalled_CustomerAccess()
		{
			var param = new AuthParams() { Mail = "jan.kowalski@wp.pl", Password = "123456" };

			var result = await _customerController.GetCustomerAccess(param) as StatusCodeResult;

            Assert.Equal(HttpStatusCode.OK, (HttpStatusCode)result.StatusCode);
        }

        [Fact]
        public async void Post_WhenCalled_NotCustomerAccess()
        {
            var param = new AuthParams() { Mail = "jan.kowalski@wp.pl", Password = "123" };

            var result = await _customerController.GetCustomerAccess(param) as StatusCodeResult;

            Assert.Equal(HttpStatusCode.Unauthorized, (HttpStatusCode)result.StatusCode);
        }

		[Fact]
		public async void Post_WhenCalled_AddCustomer()
		{
			var customer = new Customer
			{
				FirstName = "Ryszard",
				LastName = "Chudy",
				Mail = "ryszard.chudy@wp.pl",
				Phone = 22334455,
				Password = "1234567",
			};

			var result = await _customerController.AddCustomer(customer);



            //Assert.Equal(HttpStatusCode.Unauthorized, (HttpStatusCode)result.StatusCode);
        }
    }
}

