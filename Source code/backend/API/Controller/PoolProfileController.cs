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

    [HttpGet("ByBookingDetailID")]
    public async Task<ActionResult<IEnumerable<PoolProfile?>>> GetByBookingDetailID(string id)
    {
        try{
            List<PoolProfile?> list = await _unitOfWork.PoolProfileRepository.GetByBookingDetailID(id);
            if (list.Count == 0)
                return NotFound("Pool profile not found!");
            else return Ok(list);
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
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
            if (await _unitOfWork.BookingDetailRepository.GetByIdAsync(poolprofile.BookingDetailID) == null)
                return BadRequest("Booking detail ID does not exist!");
            if (await _unitOfWork.PoolProfileRepository.AddPoolProfileAsync(poolprofile) != 0)
                return Ok($"Added {poolprofile.Name} successfully!");
            else
                return BadRequest($"Added {poolprofile.Name} failed");
        } catch (Exception ex) {
            return BadRequest("Unknown Error: " + ex.Message);
        }
    }
}
