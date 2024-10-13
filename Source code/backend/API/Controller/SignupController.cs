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
        public async Task<ActionResult<Account>> SignUp(Account info){
            


            try{
                string result = await _unitOfWork.AccountRepository.CustomerSignUpAsync( info );
                switch( result ){
                    case "Missing parameter: Email":
                    case "Missing parameter: PhoneNumber":
                    case "Missing parameter: Password":
                    case "Email must not be empy":
                    case "PhoneNumber must not be empy":
                    case "Password must not be empy":
                        return BadRequest(result);
                    case "That email is already usd!":
                    case "That phone number is alreay used!":
                        return StatusCode(StatusCodes.Status409Conflict, result);
                    case "Unable to send mail":
                        return StatusCode(StatusCodes.Status201Created, result);
                    case "Created successfully": 
                        return StatusCode(StatusCodes.Status201Created, "Signup successfully");
                    default: 
                        return StatusCode(StatusCodes.Status501NotImplemented, "You should not be here");
                }
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
                    case "Info and password must not be empty!":
                        return BadRequest(result);
                    case "Cannot find account with that ID": 
                        return NotFound(result);
                    case "No Need for OTP":
                        return StatusCode(StatusCodes.Status406NotAcceptable, result);
                    case "OTP password has expired":
                        return StatusCode(StatusCodes.Status406NotAcceptable, result);
                    case "OTP Code is incorrect":
                        return StatusCode(StatusCodes.Status406NotAcceptable, result);
                    case "OTP verify successfully":
                        return StatusCode(StatusCodes.Status200OK, result);
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
