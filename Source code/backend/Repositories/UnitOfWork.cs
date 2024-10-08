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

    private AnimalTypeRepository _animalTypeRepository;

    private RoleRepository _roleRepository;

    private AnimalProfileRepository _animalProfileRepository;
    private PoolProfileRepository _poolProfileRepository;
    private BookingDetailRepository _bookingDetailRepository;
    private EmployeeRepository _employeeRepository;


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

    public AnimalProfileRepository AnimalProfileRepository
    {
        get { return _animalProfileRepository ??= new AnimalProfileRepository(_context); }
    }

    public PoolProfileRepository PoolProfileRepository
    {
        get { return _poolProfileRepository ??= new PoolProfileRepository(_context); }
    }
    public BookingDetailRepository BookingDetailRepository
    {
        get { return _bookingDetailRepository ??= new BookingDetailRepository(_context); }
    }
    public EmployeeRepository EmployeeRepository
    {
        get {
            return _employeeRepository ??= new EmployeeRepository(_context); }
    }
    }
