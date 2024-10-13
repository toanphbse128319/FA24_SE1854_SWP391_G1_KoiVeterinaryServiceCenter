#nullable disable
using Microsoft.AspNetCore.Mvc;
using Repositories.Model;
using Repositories;

using Helper;
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

                string result = await _unitOfWork.AccountRepository.CustomerSignUpAsync( info );
                if( result == "Unable to send mail")
                    return StatusCode(StatusCodes.Status201Created, Constants.Mail.EmailSendFailedMessage);

                Console.WriteLine(info.AccountID);
                return StatusCode(StatusCodes.Status201Created, "Signup successfully");
            } catch (Exception ex){
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Route("otp")]
        [HttpPost]
        public async Task<ActionResult<string>> OTPVerify(LoginInformation info){
            try{
                string result = await _unitOfWork.AccountRepository.CheckOtp(info);
                
                switch( result ){
                    case "Cannot find account with that ID": 
                        return NotFound("Cannot find account with that info");
                    case "No Need for OTP":
                        return StatusCode(StatusCodes.Status406NotAcceptable, "Account does not need otp verification");
                    case "OTP password has expired":
                        return StatusCode(StatusCodes.Status406NotAcceptable, "OTP code expired");
                    case "Wrong OTP":
                        return StatusCode(StatusCodes.Status406NotAcceptable, "OTP code invalid");
                    case "OTP verify successfully":
                        return StatusCode(StatusCodes.Status200OK, "OTP verification successfully");
                    default:
                        return StatusCode(StatusCodes.Status501NotImplemented, "This should not show up!");
                }

            } catch (Exception ex){
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
