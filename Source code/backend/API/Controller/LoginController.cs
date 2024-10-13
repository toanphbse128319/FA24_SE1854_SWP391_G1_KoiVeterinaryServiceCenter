#nullable disable
using Microsoft.AspNetCore.Mvc;
using Repositories.Model;
using Repositories;
using Helper;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LoginController : ControllerBase
{
    private UnitOfWork _unitOfWork;

    public LoginController(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpPost]
    public async Task<ActionResult<Account>> LoggingByEmail(LoginInformation info){
        try{
            var result = await _unitOfWork.AccountRepository.LoginAsync( info );

            switch( result ){
                case "Info and password cannot be empty":
                    return BadRequest(result);
                case "Invalid username or password!":
                    return StatusCode(StatusCodes.Status401Unauthorized, result);
                case "This account hasn't verify otp code":
                    return StatusCode(StatusCodes.Status406NotAcceptable, result);
                case "Account has been disabled":
                    return StatusCode(StatusCodes.Status403Forbidden, result);
                case "Cannot find profile associate with the account":
                    return StatusCode(StatusCodes.Status417ExpectationFailed, result);
                default:
                    return Ok(result);
            }   
        } catch ( Exception ex ){
            Console.WriteLine(ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

}

