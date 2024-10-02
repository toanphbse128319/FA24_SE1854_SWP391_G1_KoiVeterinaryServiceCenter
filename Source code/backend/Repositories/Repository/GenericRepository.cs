#nullable disable
using Microsoft.EntityFrameworkCore;
namespace Repositories.Repository;
public class GenericRepository<T> where T : class{
    protected Context _context;

    public GenericRepository() => _context ??= new Context();

    public GenericRepository(Context context) => _context = context;

    public List<T> GetAlL(){
        return _context.Set<T>().ToList();
    }

    public void Create(T entity){
        _context.Add(entity);
        _context.SaveChanges();
    }

    public void Update(T entity){
        var tracker = _context.Attach(entity);
        tracker.State = EntityState.Modified;
        _context.SaveChanges();
    }

    //The code Teacher provided used bool and return true, despite the .Remove(entity) 
    //only return an object despite being available in the context or not
    //And SaveChange only throw Exception
    public void Remove(T entity){
        _context.Remove(entity);
        _context.SaveChanges();
    }

    public T GetById(int id){
        return _context.Set<T>().Find(id);
    }

    public T GetById(string code){
        return _context.Set<T>().Find(code);
    }

    //Use guids when you have multiple independent systems or clients generating ID's that need to be unique. 
    //http://stackoverflow.com/questions/371762/ddg#371788
    //Still don't know why we use here?
    public T GetById(Guid code){
        return _context.Set<T>().Find(code);
    }

    #region Asyncronous

    public async Task<List<T>> GetAllAsync()
    {
        return await _context.Set<T>().ToListAsync();
    }
    public async Task<int> CreateAsync(T entity)
    {
        _context.Add(entity);
        return await _context.SaveChangesAsync();
    }
    public async Task<int> UpdateAsync(T entity)
    {
        var tracker = _context.Attach(entity);
        tracker.State = EntityState.Modified;

        return await _context.SaveChangesAsync();
    }

    public async Task<bool> RemoveAsync(T entity)
    {
        _context.Remove(entity);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<T> GetByIdAsync(int id)
    {
        return await _context.Set<T>().FindAsync(id);
    }

    public async Task<T> GetByIdAsync(string code)
    {
        return await _context.Set<T>().FindAsync(code);
    }

    public async Task<T> GetByIdAsync(Guid code)
    {
        return await _context.Set<T>().FindAsync(code);
    }

    #endregion

    
    #region Separating asigned entities and save operators        
    //
//This will ONLY MODIFY data to the context. but now save down to the database
    public void PrepareCreate(T entity)
    {
        _context.Add(entity);
    }


//This will ONLY MODIFY data to the context. but now save down to the database
    public void PrepareUpdate(T entity)
    {
        var tracker = _context.Attach(entity);
        tracker.State = EntityState.Modified;
    }


//This will ONLY MODIFY data to the context. but now save down to the database
    public void PrepareRemove(T entity)
    {
        _context.Remove(entity);
    }

//This will save the context down to the database
    public int Save()
    {
        return _context.SaveChanges();
    }


//This will save the context down to the database
    public async Task<int> SaveAsync()
    {
        return await _context.SaveChangesAsync();
    }

    #endregion Separating asign entity and save operators
}

