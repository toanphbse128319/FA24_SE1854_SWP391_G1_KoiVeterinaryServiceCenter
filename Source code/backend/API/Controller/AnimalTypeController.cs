#nullable disable
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
    public class AnimalTypeController : ControllerBase
    {
        private UnitOfWork _unitOfWork;
        public AnimalTypeController(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<AnimalType>> GetAnimalTypeByID(string id)
        {
            return await _unitOfWork.AnimalTypeRepository.GetByIdAsync(id);
        }

        [HttpPost]
        public async Task<ActionResult<AnimalType?>> AddAnimalType(AnimalType animaltype)
        {
            try
            {
                if (animaltype.Name.Equals(""))
                    return BadRequest("Animal type are empty!");
                if(await _unitOfWork.AnimalTypeRepository.AddAnimalTypeAsync(animaltype) == null)
                    return Conflict("Animal type already exists!");
                return Ok($"Added {animaltype.Name} successfully!");
            }
            catch (Exception ex)
            {
                return BadRequest("Unknown Error: " + ex.Message);
            }


        }
    }
}
