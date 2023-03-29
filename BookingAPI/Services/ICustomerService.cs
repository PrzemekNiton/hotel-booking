using BookingAPI.Entities;

namespace BookingAPI.Services
{
	public interface ICustomerService
	{
        Task<List<Customer>?> GetCustomersAsync();

        Task<Customer?> GetCustomerAsync(int id);

        Task<Customer?> AddCustomerAsync(Customer customer);

        Task<Customer?> UpdateCustomerAsync(Customer customer);

        Task<bool> CustomerAccessAsync(string email, string password);

        Task<bool> CheckIsMailExist(string email);
    }
}
