#nullable disable
using Microsoft.AspNetCore.Mvc;
using Repositories;

namespace API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ServiceDeliveryMethodController : ControllerBase
    {

        private UnitOfWork _unitOfWork;

        public ServiceDeliveryMethodController(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServiceDeliveryMethod>>> GetAll(){
            try {
                return await _unitOfWork.ServiceDeliveryMethodRepository.GetAllAsync();
            } catch ( Exception ex ){
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceDeliveryMethod>> GetDeliveryMethodByID(string id){
            try{ 
                return await _unitOfWork.ServiceDeliveryMethodRepository.GetByIdAsync(id);
            } catch ( Exception ex ){
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
