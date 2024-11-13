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

    [HttpGet("getbyrolename")]
    public async Task<ActionResult<List<Employee>>> GetByRole(string info) {
        try {
            List<Employee> list =  await _unitOfWork.EmployeeRepository.SearchByRoleName( info );
            if( list.Count == 0 )
                StatusCode( StatusCodes.Status404NotFound, "Unable to find the role" );
            return Ok( list );
        } catch (Exception ex) {
            Console.WriteLine(ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
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

