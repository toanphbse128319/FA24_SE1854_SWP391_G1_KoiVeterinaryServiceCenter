﻿#nullable disable
using Microsoft.AspNetCore.Mvc;
using Repositories.Model;
using Repositories;
using Repositories.Objects;

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


    [HttpPost("add")]
    public async Task<ActionResult<AnimalProfile>> AddAnimalProfile(AnimalProfile animalprofile) {
        try{
            if ((await _unitOfWork.AnimalProfileRepository.GetByIdAsync(animalprofile.AnimalProfileID) != null))
                return BadRequest("Animal profile is already existed!");
            AnimalType animalType = await _unitOfWork.AnimalTypeRepository.GetByIdAsync(animalprofile.TypeID);
            if (animalType == null)
                return BadRequest("Animal type does not exist!");
            if (await _unitOfWork.AnimalProfileRepository.AddAnimalProfileAsync(animalprofile) != 0)
                return Ok($"Added {animalprofile.Name} successfully!");
            else
                return BadRequest($"Added {animalprofile.Name} failed");
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
    }

    [HttpPost("addProfiles")]
    public async Task<ActionResult<Profiles>> AddProfiles(Profiles profile)
    {
        try
        {
            foreach (var item in profile.AnimalProfile)
            {
                if (await _unitOfWork.BookingDetailRepository.GetByIdAsync(item.AnimalProfileID) != null)
                    return BadRequest("Animal profile is already existed!");
                if (await _unitOfWork.AnimalTypeRepository.GetByIdAsync(item.TypeID) == null)
                    return BadRequest("Animal type not found!");
            }

            foreach (var item in profile.PoolProfile)
            {
                if (await _unitOfWork.BookingDetailRepository.GetByIdAsync(item.PoolProfileID) != null)
                    return BadRequest("Pool profile is already existed!");
            }

            if (await _unitOfWork.AnimalProfileRepository.AddProfilesAsync(profile) == 1)
                return Ok("Added successfully!");
            else return BadRequest("Added failed!");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

}
