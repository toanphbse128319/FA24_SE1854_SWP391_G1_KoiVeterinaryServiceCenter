using Microsoft.AspNetCore.Mvc;
using Repositories.Model;
using Repositories;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PoolProfileController : ControllerBase {

    private UnitOfWork _unitOfWork;

    public PoolProfileController(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PoolProfile>> GetPoolProfileByID(string id)
    {
        try{
            return await _unitOfWork.PoolProfileRepository.GetByIdAsync(id);
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
    }

    [HttpPost("add")]
    public async Task<ActionResult<PoolProfile?>> AddPoolProfile(PoolProfile poolprofile)
    {
        try {
            if ((await _unitOfWork.PoolProfileRepository.GetByIdAsync(poolprofile.PoolProfileID) != null))
                return BadRequest("Pool profile is already existed!");
            string result = await _unitOfWork.PoolProfileRepository.AddPoolProfileAsync(poolprofile);
            if ( result.ToLower().Contains("invalid") )
                return BadRequest($"Added {poolprofile.Name} failed");
            return Ok($"Added {poolprofile.Name} successfully!");
        } catch (Exception ex) {
            return BadRequest("Unknown Error: " + ex.Message);
        }
    }

}
