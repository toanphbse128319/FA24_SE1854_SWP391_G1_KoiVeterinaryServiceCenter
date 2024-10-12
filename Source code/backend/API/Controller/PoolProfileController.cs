using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Repositories.Model;
using Microsoft.EntityFrameworkCore;
using Repositories.Repository;
using Repositories;


namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PoolProfileController : ControllerBase
    {
        private UnitOfWork _unitOfWork;
        public PoolProfileController(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PoolProfile>> GetPoolProfileByID(string id)
        {
            return await _unitOfWork.PoolProfileRepository.GetByIdAsync(id);
        }

        [HttpPost]
        public async Task<ActionResult<PoolProfile?>> AddPoolProfile(PoolProfile poolprofile)
        {
            try
            {
                if ((await _unitOfWork.PoolProfileRepository.GetByIdAsync(poolprofile.PoolProfileID) != null))
                    return BadRequest("Pool profile is already existed!");
                if (await _unitOfWork.BookingDetailRepository.GetByIdAsync(poolprofile.BookingDetailID) == null)
                    return BadRequest("Booking detail ID does not exist!");
                if (await _unitOfWork.PoolProfileRepository.AddPoolProfileAsync(poolprofile) != null)
                    return Ok($"Added {poolprofile.Name} successfully!");
                else
                    return BadRequest($"Added {poolprofile.Name} failed");
            }
            catch (Exception ex)
            {
                return BadRequest("Unknown Error: " + ex.Message);
            }
        }
    }
}


