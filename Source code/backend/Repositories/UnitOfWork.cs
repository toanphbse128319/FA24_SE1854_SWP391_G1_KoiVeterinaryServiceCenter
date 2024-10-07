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
<<<<<<< HEAD
    private AnimalTypeRepository _animalTypeRepository;
=======
    private RoleRepository _roleRepository;
>>>>>>> 7efa8cd (Added role repository into unit of work)

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
        get { return _bookingRepository ??= new BookingRepository(_context); }
    }

    public RoleRepository RoleRepository{
        get { return _roleRepository ??= new RoleRepository(_context); }
    }

    public AnimalTypeRepository AnimalTypeRepository 
    {
        get { return _animalTypeRepository ??= new AnimalTypeRepository(_context); }
    }
}
