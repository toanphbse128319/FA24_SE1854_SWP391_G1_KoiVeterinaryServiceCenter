#nullable disable
using Microsoft.AspNetCore.Mvc;
using Repositories;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PostController : ControllerBase
{
    private UnitOfWork _unitOfWork;
    public PostController(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Post>>> GetAll(){
        return await _unitOfWork.PostReposity.GetAllAsync();

    }

}
