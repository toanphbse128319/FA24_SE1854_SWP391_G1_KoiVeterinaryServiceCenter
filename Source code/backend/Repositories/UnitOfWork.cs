#nullable disable
using Repositories.Repository;
namespace Repositories;

public class UnitOfWork{

    private Context _context;
    private FAQRepository _faqRepository;
    private AccountRepository _accountRepository;
    private PostReposity _postRepository;
    private ServiceRepository _serviceRepository;
    private ServiceDeliveryMethodRepository _serviceDeliveryMethoddRepository;
    private BookingRepository _bookingRepository;

    public UnitOfWork(){
        _context ??= new Context();
    }

    public AccountRepository AccountRepository {
        get { return _accountRepository ??= new AccountRepository(_context); }
    }
    
    public FAQRepository FAQRepository {
        get { return _faqRepository ??= new FAQRepository(_context); }
    }

    public PostReposity PostReposity {
        get { return _postRepository ??= new PostReposity(_context); }
    }

    public ServiceRepository ServiceRepository {
        get { return _serviceRepository ??= new ServiceRepository(_context); }
    }

    public ServiceDeliveryMethodRepository ServiceDeliveryMethodRepository {
        get { return _serviceDeliveryMethoddRepository ??= new ServiceDeliveryMethodRepository(_context); }
    }
    public BookingRepository BookingRepository
    {
        get { return _bookingRepository??= new BookingRepository(_context); }
    }
}
