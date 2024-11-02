#nullable disable
using Microsoft.AspNetCore.Mvc;
using Repositories.Model;
using Repositories;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ServiceUse : ControllerBase
{

    private UnitOfWork _unitOfWork;
    public ServiceUse(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet("all")]
    public async Task<ActionResult<List<ServiceUse>>> GetAll()
    {
        try
        {
            return Ok(await _unitOfWork.ServiceUseRepository.GetAllAsync());
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

}

