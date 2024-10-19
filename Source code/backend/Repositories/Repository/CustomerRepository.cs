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

        public async Task<string> AddAsync(Customer customer){
            if( customer == null )
                return "Customer is empty";
            if( customer.Firstname == null || customer.Address == null )
                return "customer name, address cannot be null";
            if( customer.CustomerID == null ) 
                customer.CustomerID = "C" + base.GetAllAsync().Result.Count + 1;
            if( customer.CustomerID.Count() == 0 )
                customer.CustomerID = "C" + base.GetAllAsync().Result.Count + 1;
            await base.CreateAsync(customer);
            return customer.CustomerID;
        }
    }
}

