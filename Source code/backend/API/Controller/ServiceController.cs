#nullable disable
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Repositories;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ServiceController : ControllerBase
{

    private UnitOfWork _unitOfWork;

    public ServiceController(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Service>>> GetAll()
    {
        try{
            return await _unitOfWork.ServiceRepository.GetAllAsync();
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
    }

    [HttpGet("{id}")]
    [Authorize(Policy = "customer_policy")]
    public async Task<ActionResult<Service>> GetServiceByID(string id)
    {
        try{
            var service = await _unitOfWork.ServiceRepository.GetByIdAsync(id);
            if (service == null)
                return NotFound("Cannot find service with that id");
            return Ok(service);
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
    }

    //This will automatically create or update new service depend on the data, if there's ServiceID available,
    //Then this will update, and add if there's none.
    [HttpPut]
    [Authorize(Policy = "staff_policy")]
    public async Task<ActionResult<Service>> AddOrUpdateService(Service service){
        try{
            string result = await _unitOfWork.ServiceRepository.AddOrUpdateService( service );
            if( result.ToLower().Contains("cannot") )
                return StatusCode( StatusCodes.Status400BadRequest, result );
            if( result.ToLower().Contains("failed") )
                return StatusCode( StatusCodes.Status406NotAcceptable, result );
            return Ok( result );
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
    }
}
