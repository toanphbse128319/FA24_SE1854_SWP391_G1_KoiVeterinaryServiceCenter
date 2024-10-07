#nullable disable
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Repositories;

namespace API.Controllers
{

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
        public async Task<ActionResult<IEnumerable<Service>>> GetAll(){
            try{ 
                return await _unitOfWork.ServiceRepository.GetAllAsync();
            } catch( Exception ex ){
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        [Authorize(Policy = "customer_policy")]
        [Authorize(Policy = "staff_policy")]
        public async Task<ActionResult<Service>> GetServiceByID(string id){
            try{ 
                var service = await _unitOfWork.ServiceRepository.GetByIdAsync(id);
                if( service == null )
                    return NotFound("Cannot find service with that id");

                return Ok(service);
            } catch( Exception ex ) {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
