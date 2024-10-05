#nullable disable
using Microsoft.AspNetCore.Mvc;
using Repositories.Model;
using Repositories;
namespace API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class SignupController : ControllerBase
    {
        private UnitOfWork _unitOfWork;
        public SignupController(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        public async Task<ActionResult<Account>> LoggingByEmail(Account info){
            try{
                Account empty = new Account();
                if( _unitOfWork.AccountRepository.FindEmail(info.Email) != null )
                    return Conflict("That email is already used!");
                if( _unitOfWork.AccountRepository.FindPhoneNumber(info.PhoneNumber) != null )
                    return Conflict("That phone number is already used!");
                var account = await _unitOfWork.AccountRepository.SignUpAsync( info );
                return account!;
            } catch (Exception ex){
                return BadRequest("Unknown Error: " + ex.GetBaseException().ToString());
            }
        }

    }
}
