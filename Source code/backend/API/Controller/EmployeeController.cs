#nullable disable
using Microsoft.AspNetCore.Mvc;
using Repositories.Model;
using Repositories;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EmployeeController : ControllerBase {

    private UnitOfWork _unitOfWork;

    public EmployeeController(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

   

    [HttpPut]
    [Authorize(Policy = "manager_policy")]
    public async Task<ActionResult> AddOrUpdate( Employee info ){
        try{
            string result = await _unitOfWork.EmployeeRepository.UpdateOrAddAsync( info );
            if( result != "Ok" )
                return StatusCode(StatusCodes.Status400BadRequest, result );
            return Ok();
        } catch ( Exception ex ) {
            Console.WriteLine(ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpGet]
    [Authorize(Policy = "manager_policy")]
    public async Task<ActionResult> GetAll(){
        try{
            return Ok(await _unitOfWork.EmployeeRepository.GetAllAsync() );
        } catch ( Exception ex ) {
            Console.WriteLine(ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }


}

