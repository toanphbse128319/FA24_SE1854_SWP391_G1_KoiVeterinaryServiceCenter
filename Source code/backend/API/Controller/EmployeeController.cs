#nullable disable
using Microsoft.AspNetCore.Mvc;
using Repositories.Model;
using Repositories;

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

}

