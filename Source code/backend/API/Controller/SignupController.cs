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
                //Check if the paramter is null
                if( info.Email == null )
                    return BadRequest("Missing parameter: Email");
                if( info.PhoneNumber == null ) 
                    return BadRequest("Missing parameter: PhoneNumber");
                if( info.Password == null )
                    return BadRequest("Missing parameter: Password");
                //Check if parameter is empty
                if( info.Email == String.Empty )
                    return BadRequest("Email must not be empty");
                if( info.PhoneNumber == String.Empty ) 
                    return BadRequest("PhoneNumber must not be empty");
                if( info.Password == String.Empty )
                    return BadRequest("Password must not be empty");
                if( _unitOfWork.AccountRepository.FindEmail(info.Email) != null )
                    return Conflict("That email is already used!");
                if( _unitOfWork.AccountRepository.FindPhoneNumber(info.PhoneNumber) != null )
                    return Conflict("That phone number is already used!");
                var account = await _unitOfWork.AccountRepository.SignUpAsync( info );
                return Created();
            } catch (Exception ex){
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

    }
}
