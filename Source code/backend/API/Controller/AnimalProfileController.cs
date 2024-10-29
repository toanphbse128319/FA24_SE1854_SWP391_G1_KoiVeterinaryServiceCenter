#nullable disable
using Microsoft.AspNetCore.Mvc;
using Repositories.Model;
using Repositories;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AnimalProfileController : ControllerBase {

    private UnitOfWork _unitOfWork;
    public AnimalProfileController(UnitOfWork unitOfWork) {
        _unitOfWork = unitOfWork;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AnimalProfile>> GetAnimalProfileByID(string id) {
        try{
            return await _unitOfWork.AnimalProfileRepository.GetByIdAsync(id);
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
    }

    [HttpGet("bybookingdetailid")]
    public async Task<ActionResult<IEnumerable<AnimalProfile>>> GetByBookingDetailID(string id) {
        try{
            List<AnimalProfile> list = await _unitOfWork.AnimalProfileRepository.GetByBookingDetailID(id);
            if (list.Count == 0)
                return NotFound("Animal profile not found!");
            else return Ok(list);
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
    }

    [HttpPost("add")]
    public async Task<ActionResult<AnimalProfile>> AddAnimalProfile(AnimalProfile animalprofile) {
        try{
            if ((await _unitOfWork.AnimalProfileRepository.GetByIdAsync(animalprofile.AnimalProfileID) != null))
                return BadRequest("Animal profile is already existed!");
            AnimalType animalType = await _unitOfWork.AnimalTypeRepository.GetByIdAsync(animalprofile.TypeID);
            if (animalType == null)
                return BadRequest("Animal type does not exist!");
            if (await _unitOfWork.BookingDetailRepository.GetByIdAsync(animalprofile.BookingDetailID) == null)
                return BadRequest("Booking detail ID does not exist!");
            if (await _unitOfWork.AnimalProfileRepository.AddAnimalProfileAsync(animalprofile) != 0)
                return Ok($"Added {animalprofile.Name} successfully!");
            else
                return BadRequest($"Added {animalprofile.Name} failed");
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
    }
    
    [HttpPost("addList")]
    public async Task<ActionResult<AnimalProfile>> AddAnimalProfiles(IEnumerable<AnimalProfile> animalprofiles) {
        try{
            int rs = (await _unitOfWork.AnimalProfileRepository.AddAnimalProfilesAsync(animalprofiles));
            if (rs == animalprofiles.Count())
                return Ok($"Added " + rs);
            else return BadRequest("Add failed");
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
    }

}
