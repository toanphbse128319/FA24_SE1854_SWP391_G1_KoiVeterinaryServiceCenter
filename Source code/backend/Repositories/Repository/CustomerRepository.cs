using Repositories.Model;

namespace Repositories.Repository
{
    public class CustomerRepository : GenericRepository<Customer>
    {

        public CustomerRepository(Context context)
        {
            _context = context;
        }

    }
}

