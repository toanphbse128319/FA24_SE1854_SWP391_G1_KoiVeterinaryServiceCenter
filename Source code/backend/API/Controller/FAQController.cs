#nullable disable
using Microsoft.AspNetCore.Mvc;
using Repositories.Model;
using Repositories;

namespace API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class FAQController : ControllerBase
    {
        private UnitOfWork _unitOfWork;
        public FAQController(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<FAQ>>> GetAll()
        {
            return await _unitOfWork.FAQRepository.GetAllAsync();

        }

        [HttpGet]
        public async Task<ActionResult<FAQ>> GetFAQByID(string id)
        {
            return await _unitOfWork.FAQRepository.GetByIdAsync(id);
        }

    }
}
