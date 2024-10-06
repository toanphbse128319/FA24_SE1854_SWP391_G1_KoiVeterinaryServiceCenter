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
            var account = await _unitOfWork.AccountRepository.LoginAsync( info );
            if( account == null )
                return NotFound("Login information is incorrect!");
            account.Password = "******";
            return account!;
        } catch ( Exception ex ) {
            return BadRequest(ex.GetBaseException().ToString());
        }
    }

}

