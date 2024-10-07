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
            return await _unitOfWork.ServiceDeliveryMethodRepository.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceDeliveryMethod>> GetDeliveryMethodByID(string id){
            return await _unitOfWork.ServiceDeliveryMethodRepository.GetByIdAsync(id);
        }
    }
}
