using BookingAPI.Entities;
using BookingAPI.Services;
using BookingAPI.Utils;

namespace BookingAPITests.Services
{
	public class CustomerServiceFake : ICustomerService
	{
        private List<Customer> _customerList;

		public CustomerServiceFake()
		{
            _customerList = new List<Customer>
            {
                new Customer()
                {
                    Id = 1,
                    FirstName = "Jan",
                    LastName = "Kowalski",
                    Mail = "jan.kowalski@wp.pl",
                    Password = "?\n?9I?Y??V?W?\u000f?>",
                    Reservations = new List<Reservation>()
                },
                new Customer()
                {
                    Id = 2,
                    FirstName = "Jan",
                    LastName = "Nowak",
                    Mail = "jan.nowak@wp.pl",
                    Password = "?\n?9I?Y??V?W?\u000f?>",
                    Reservations = new List<Reservation>()
                },
            };
		}

        public Task<bool> CustomerAccessAsync(string email, string password)
        {
            var result = _customerList
                    .Where(p => p.Mail.Equals(email) && p.Password.Equals(Utility.MD5Hash(password)))
                    .FirstOrDefault();

            return Task.FromResult(result != null);
        }

        public async Task<List<Customer>?> GetCustomersAsync()
        {
            return await Task.Run(() => _customerList);
        }

        public async Task<Customer?> GetCustomerAsync(int id)
        {
            return await Task.Run(() => _customerList.FirstOrDefault(p => p.Id == id));
        }

        public async Task<Customer?> AddCustomerAsync(Customer customer)
        {
            customer.Id = _customerList.Count + 1;
            customer.Password = Utility.MD5Hash(customer.Password);
            _customerList.Add(customer);

            return await Task.Run(() => _customerList.Find(p => p.Id == customer.Id));
        }

        public async Task<bool> CheckIsMailExist(string email)
        {
            var result = await Task.Run(() =>
            _customerList.FirstOrDefault(p => p.Mail.Equals(email)));

            if (result == null)
            {
                return false;
            }

            return true;
        }

        public Task<Customer?> UpdateCustomerAsync(Customer customer)
        {
            throw new NotImplementedException();
        }
    }
}

