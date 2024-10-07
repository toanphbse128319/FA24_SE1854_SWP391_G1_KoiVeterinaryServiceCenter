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

            if( info.Info == null )
                return BadRequest("Missing parameter: Info");
            if( info.Password == null )
                return BadRequest("Missing parameter: password");
            if( info.Info.Trim() == "" )
                return BadRequest("Info cannot be empty");
            if( info.Password.Trim() == "" )
                return BadRequest("Password cannot be empty");

            var account = await _unitOfWork.AccountRepository.LoginAsync( info );
            if( account == null )
                return StatusCode(StatusCodes.Status401Unauthorized, "Invalid username or password!");
            account.Password = "******";
            return account!;
        } catch ( Exception ex ){
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

}

