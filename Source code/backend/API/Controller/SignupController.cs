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
        public async Task<ActionResult<Account>> SignUp(CustomerSignupInformation info ){
            try{
                string result = await _unitOfWork.AccountRepository.CustomerSignUpAsync( info );
                if( result.Contains("cannot be") )
                    return StatusCode(StatusCodes.Status400BadRequest, result);
                switch( result ){
                    case "Customer is empty":
                    case "customer name, address cannot be null":
                    case "Email must not be empty":
                    case "PhoneNumber must not be empty":
                    case "Password must not be empty":
                        return BadRequest(result);
                    case "That email is already used!":
                    case "That phone number is alreay used!":
                        return StatusCode(StatusCodes.Status409Conflict, result);
<<<<<<< HEAD
                    case "Created successfully": 
||||||| ca233e6
                    case "Unable to send mail":
                        return StatusCode(StatusCodes.Status201Created, result);
                    case "Created successfully": 
=======
                    case "Unable to send mail":
                        return StatusCode(StatusCodes.Status201Created, result);
                    case "Created successfully":
>>>>>>> origin/Dev
                        return StatusCode(StatusCodes.Status201Created, "Signup successfully");
                    default:
                        return StatusCode(StatusCodes.Status501NotImplemented, "You should not be here");
                }
<<<<<<< HEAD
            } catch (Exception ex){
                Console.WriteLine(ex);
||||||| ca233e6
            } catch (Exception ex){
=======
            }
            catch (Exception ex)
            {
>>>>>>> origin/Dev
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Route("otp/check")]
        [HttpPost]
<<<<<<< HEAD
        public async Task<ActionResult<string>> OTPVerify(LoginInformation info){
            try{
||||||| ca233e6
        public async Task<ActionResult<string>> OTPVerify(LoginInformation info){
            
            try{
=======
        public async Task<ActionResult<string>> OTPVerify(LoginInformation info)
        {

            try
            {
>>>>>>> origin/Dev
                string result = await _unitOfWork.AccountRepository.CheckOtp(info);

                switch (result)
                {
                    case "Info and password must not be empty!":
                        return BadRequest(result);
                    case "Cannot find account with that ID":
                        return NotFound(result);
                    case "No need for OTP":
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

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Route("otp/send")]
        [HttpGet]
        public async Task<ActionResult<string>> SendOTP(string info){
            try{
                string result = await _unitOfWork.AccountRepository.SendOtpMail(info);
                switch ( result ){
                    case "Info cannot be null!":
                    case "Info must not be empty!":
                        return StatusCode(StatusCodes.Status400BadRequest, result);
                    case "Unable to find the account":
                        return StatusCode(StatusCodes.Status404NotFound, result);
                    case "No need for OTP":
                        return StatusCode(StatusCodes.Status406NotAcceptable, result);
                    case "Unable to send mail":
                        return StatusCode(StatusCodes.Status422UnprocessableEntity, result);
                    case "Send mail successfully":
                        return StatusCode(StatusCodes.Status200OK, result);
                    default:
                        return StatusCode(StatusCodes.Status501NotImplemented, "You should not be here");
                }
            } catch (Exception ex){
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }

        }   
    }
}
