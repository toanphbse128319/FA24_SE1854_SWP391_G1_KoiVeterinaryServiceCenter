#nullable disable
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

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

            string firstname = null;
            string lastname = null;
            Customer customer = await _unitOfWork.CustomerRepository.SearchByAccountID(account.AccountID);
            Employee employee = null;
            if( customer == null ){
                employee = await _unitOfWork.EmployeeRepository.SearchByAccountID(account.AccountID);
                if( employee == null ){
                    return StatusCode(StatusCodes.Status404NotFound, "Cannot find profile associate with the account");
                }
                firstname = employee.FirstName;
                lastname = employee.Lastname;
            } else {
                firstname = customer.FirstName;
                lastname = customer.Lastname;
            }

            var currentRole = _unitOfWork.RoleRepository.getRoleName(account.RoleID);
            
            Token token = new Token();

            var claims = new List<Claim>{
                new Claim("Id", Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, account.Email),
                new Claim(ClaimTypes.Role, currentRole),
                new Claim("Firstname", firstname),
                new Claim("Lastname", lastname)
                //new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())  
                /*
                 * The identifier value MUST be assigned in a manner that ensures that
                 *there is a negligible probability that the same value will be
                 *accidentally assigned to a different data object; if the application
                 *uses multiple issuers, collisions MUST be prevented among values
                 *produced by different issuers as well. The "jti" claim can be used
                 *to prevent the JWT from being replayed. The "jti" value is a case-
                 *sensitive string. Use of this claim is OPTIONAL.
                 */
            }; 
            token.Claims = claims;

            return Ok(token.GenerateToken(4));

        } catch ( Exception ex ){
            Console.WriteLine(ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

}

