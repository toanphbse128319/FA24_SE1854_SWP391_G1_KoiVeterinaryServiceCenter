using Microsoft.EntityFrameworkCore;
using Repositories.Model;

namespace Repositories.Repository
{
    public class CustomerRepository : GenericRepository<Customer>
    {

        public CustomerRepository(Context context)
        {
            _context = context;
        }

        public async Task<Customer?> SearchByAccountIDAsync(string id)
        {
            return await _context.Customers.FirstOrDefaultAsync(customer => customer.AccountID == id);
        }

        public Customer? SearchByAccountID(string id)
        {
            return _context.Customers.FirstOrDefault(customer => customer.AccountID == id);
        }
    }
}

