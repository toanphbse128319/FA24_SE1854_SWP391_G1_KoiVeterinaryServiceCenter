#nullable disable
using Microsoft.AspNetCore.Mvc;
using Repositories.Model;
using Repositories;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase {

    private UnitOfWork _unitOfWork;

    public AccountController(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<List<Employee>>> GetByRole(string id) {
        try {
            Account result =  await _unitOfWork.AccountRepository.GetByIdAsync( id );
            if( result == null )
                StatusCode( StatusCodes.Status404NotFound, "Unable to find the account" );
            string temp = "";
            foreach( char character in result.Password )
                temp += "*";
            return Ok( result );
        } catch (Exception ex) {
            Console.WriteLine(ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

}

