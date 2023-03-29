using System.Security.Cryptography;
using System.Text;
using BookingAPI.Data;
using BookingAPI.Entities;
using BookingAPI.Utils;
using Microsoft.EntityFrameworkCore;

namespace BookingAPI.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly AppDbContext _db;

        public CustomerService(AppDbContext db)
        {
            _db = db;
        }

        public async Task<bool> CustomerAccessAsync(string email, string password)
        {
            try
            {
                var customer = await _db.Customers
                    .Where(p => p.Mail.Equals(email) && p.Password.Equals(Utility.MD5Hash(password)))
                    .FirstOrDefaultAsync();

                return customer != null;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<List<Customer>?> GetCustomersAsync()
        {
            try
            {
                return await _db.Customers
                    .Include(p => p.Reservations)
                    .ToListAsync();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<Customer?> GetCustomerAsync(int id)
        {
            try
            {
                return await _db.Customers.Include(p => p.Reservations)
                        .FirstOrDefaultAsync(p => p.Id == id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<Customer?> AddCustomerAsync(Customer customer)
        {
            try
            {
                customer.Password = Utility.MD5Hash(customer.Password);

                await _db.Customers.AddAsync(customer);
                await _db.SaveChangesAsync();

                return await _db.Customers.FindAsync(customer.Id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<Customer?> UpdateCustomerAsync(Customer customer)
        {
            try
            {
                _db.Entry(customer).State = EntityState.Modified;
                await _db.SaveChangesAsync();

                return customer;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<bool> CheckIsMailExist(string email)
        {
            try
            {
                var result = await _db.Customers.FirstOrDefaultAsync(p => p.Mail.Equals(email));

                if (result == null)
                {
                    return false;
                }

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
