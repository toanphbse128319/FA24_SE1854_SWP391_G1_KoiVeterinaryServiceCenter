#nullable disable
using Microsoft.AspNetCore.Mvc;
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
            return await _unitOfWork.ServiceRepository.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Service>> GetServiceByID(string id){
            return await _unitOfWork.ServiceRepository.GetByIdAsync(id);
        }
    }
}
