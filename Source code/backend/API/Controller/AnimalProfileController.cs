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
    public class AnimalProfileController : ControllerBase
    {
        private UnitOfWork _unitOfWork;
        public AnimalProfileController(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        public async Task<ActionResult<AnimalProfile?>> AddAnimalProfile(AnimalProfile animalprofile)
        {
            try
            {   
                if((await _unitOfWork.AnimalProfileRepository.FindAnimalProfileByIdAsync(animalprofile.AnimalProfileID) != null))
                    return BadRequest("Animal profile is already existed!");
                var animalType = await _unitOfWork.AnimalTypeRepository.FindAnimalTypeByIdAsync(animalprofile.TypeID);
                if (animalType == null)
                    return BadRequest("Animal type does not exist!");
                if(await _unitOfWork.BookingDetailRepository.FindBookingDetailAsync(animalprofile.BookingDetailID) == null)
                    return BadRequest("Booking detail ID does not exist!");
                if (await _unitOfWork.AnimalProfileRepository.AddAnimalProfileAsync(animalprofile) != null)
                    return Ok($"Added {animalprofile.Name} successfully!");
                else
                    return BadRequest($"Added {animalprofile.Name} failed");
            }
            catch (Exception ex)
            {
                return BadRequest("Unknown Error: " + ex.Message);
            }


        }
    }
}
