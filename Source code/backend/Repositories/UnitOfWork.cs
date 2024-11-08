#nullable disable
using Repositories.Repository;
namespace Repositories;

public class UnitOfWork
{

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
    private CustomerRepository _customerRepository;
    private ScheduleRepository _scheduleRepository;
    private SlotTableRepository _slotTableRepository;
    private FeedbackRepository _feedbackRepository;
    private ServiceUseRepository _serviceUseRepository;

    public UnitOfWork()
    {
        _context ??= new Context();
    }

    public async void CommitTransactionAsync(){
        await _context.Database.CommitTransactionAsync();
    }

    public async void RollbackTransactionAsync(){
        await _context.Database.RollbackTransactionAsync();
    }

    public async void BeginTransactionAsync(){
        await _context.Database.BeginTransactionAsync();
    }

    public AccountRepository AccountRepository
    {
        get { return _accountRepository ??= new AccountRepository(_context); }
    }

    public FAQRepository FAQRepository
    {
        get { return _faqRepository ??= new FAQRepository(_context); }
    }

    public PostReposity PostReposity
    {
        get { return _postRepository ??= new PostReposity(_context); }
    }

    public ServiceRepository ServiceRepository
    {
        get { return _serviceRepository ??= new ServiceRepository(_context); }
    }

    public ServiceDeliveryMethodRepository ServiceDeliveryMethodRepository
    {
        get { return _serviceDeliveryMethoddRepository ??= new ServiceDeliveryMethodRepository(_context); }
    }


    public BookingRepository BookingRepository
    {
        get { return _bookingRepository ??= new BookingRepository(_context); }
    }

    public RoleRepository RoleRepository
    {
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
        get
        {
            return _employeeRepository ??= new EmployeeRepository(_context);
        }
    }

    public CustomerRepository CustomerRepository
    {
        get { return _customerRepository ??= new CustomerRepository(_context); }
    }


    public ScheduleRepository ScheduleRepository
    {
        get { return _scheduleRepository ??= new ScheduleRepository(_context); }
    }

    public SlotTableRepository SlotTableRepository
    {
        get { return _slotTableRepository ??= new SlotTableRepository(_context); }
    }

    public FeedbackRepository FeedbackRepository
    {
        get { return _feedbackRepository ??= new FeedbackRepository(_context); }
    }

    public ServiceUseRepository ServiceUseRepository
    {
        get { return _serviceUseRepository ??= new ServiceUseRepository(_context); }
    }
}
