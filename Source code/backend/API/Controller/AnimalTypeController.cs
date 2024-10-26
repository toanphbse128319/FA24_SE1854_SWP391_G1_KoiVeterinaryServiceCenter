#nullable disable
using Microsoft.AspNetCore.Mvc;
using Repositories.Model;
using Repositories;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AnimalTypeController : ControllerBase {

    private UnitOfWork _unitOfWork;
    public AnimalTypeController(UnitOfWork unitOfWork) {
        _unitOfWork = unitOfWork;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AnimalType>> GetAnimalTypeByID(string id) {
        try{
            AnimalType data  = await _unitOfWork.AnimalTypeRepository.GetByIdAsync(id);
            if( data == null )
                return StatusCode( StatusCodes.Status404NotFound, "Cannot find animal type" );
            return Ok( data );
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
    }

    [HttpPost("add")]
    public async Task<ActionResult<AnimalType>> AddAnimalType(AnimalType animaltype) {
        try{
            if (animaltype.Name.Equals(""))
                return BadRequest("Animal type are empty!");
            if (await _unitOfWork.AnimalTypeRepository.AddAnimalTypeAsync(animaltype) == null)
                return Conflict("Animal type already exists!");
            return Ok($"Added {animaltype.Name} successfully!");
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
    }

}
