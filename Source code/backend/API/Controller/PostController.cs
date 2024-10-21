#nullable disable
using Microsoft.AspNetCore.Mvc;
using Repositories;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PostController : ControllerBase {

    private UnitOfWork _unitOfWork;

    public PostController(UnitOfWork unitOfWork) {
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Post>>> GetAll() {
        try{
            return await _unitOfWork.PostReposity.GetAllAsync();
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Post>> GetPostByID(string id) {
        try{
            return await _unitOfWork.PostReposity.GetByIdAsync(id);
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
    }

}
