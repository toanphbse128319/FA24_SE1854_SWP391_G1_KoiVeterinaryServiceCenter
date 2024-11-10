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

    [HttpPut]
    public async Task<ActionResult> AddOrUpdate( Account info ){
        try{
            string result = await _unitOfWork.AccountRepository.UpdateOrAdd( info );
            if( result != "Ok" )
                return StatusCode(StatusCodes.Status400BadRequest, result );
            return Ok();
        } catch ( Exception ex ) {
            Console.WriteLine(ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpGet]
    public async Task<ActionResult> GetAll(){
        try{
            return Ok(await _unitOfWork.AccountRepository.GetAllAsync() );
        } catch ( Exception ex ) {
            Console.WriteLine(ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

}

