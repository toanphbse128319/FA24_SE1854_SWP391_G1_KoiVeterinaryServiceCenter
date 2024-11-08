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
            string result = await _unitOfWork.AnimalProfileRepository.AddAnimalProfileAsync(animalprofile);
            if ( result.ToLower().Contains("invalid"))
                return BadRequest($"Added {animalprofile.Name} failed");
            return Ok($"Added {animalprofile.Name} successfully!");
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
    }

}
