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

        [HttpPost]
        [HttpPost]
        public async Task<ActionResult<PoolProfile?>> AddPoolProfile(PoolProfile poolprofile)
        {
            try
            {
                if (await _unitOfWork.PoolProfileRepository.AddPoolProfileAsync(poolprofile) != null)
                    return Ok($"Added {poolprofile.Name} successfully!");
                else
                    return BadRequest($"Added {poolprofile.Name} failed");
            }
            catch (Exception ex)
            {
                return BadRequest("Unknown Error: " + ex.Message.ToString());
            }
        }
    }
}


