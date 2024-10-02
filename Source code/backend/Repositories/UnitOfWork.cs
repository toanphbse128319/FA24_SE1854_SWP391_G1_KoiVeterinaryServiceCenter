#nullable disable
using Repositories.Repository;
namespace Repositories;

public class UnitOfWork{
    private Context _context;
    private AccountRepository _accountRepository;

    public UnitOfWork(){
        _context ??= new Context();
    }

    public AccountRepository AccountRepository {
        get { return _accountRepository ??= new AccountRepository(_context); }
    }
}
