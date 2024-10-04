#nullable disable
using Repositories.Repository;
namespace Repositories;

public class UnitOfWork{
    private Context _context;
    private FAQRepository _faqRepository;
    private AccountRepository _accountRepository;
    private PostReposity _postRepository;

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
}
