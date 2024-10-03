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
                var account = await _unitOfWork.AccountRepository.SignUpAsync( info );
                return account!;
            } catch (Exception ex){
                return BadRequest("Unknown Error: " + ex.GetBaseException().ToString());
            }
        }

    }
}
