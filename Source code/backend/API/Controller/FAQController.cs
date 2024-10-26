#nullable disable
using Microsoft.AspNetCore.Mvc;
using Repositories.Model;
using Repositories;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class FAQController : ControllerBase {

    private UnitOfWork _unitOfWork;
    public FAQController(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet("all")]
    public async Task<ActionResult<IEnumerable<FAQ>>> GetAll() {
        try{
            return await _unitOfWork.FAQRepository.GetAllAsync();
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
    }

    [HttpGet]
    public async Task<ActionResult<FAQ>> GetFAQByID(string id) {
        try{
            return await _unitOfWork.FAQRepository.GetByIdAsync(id);
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
    }

}

