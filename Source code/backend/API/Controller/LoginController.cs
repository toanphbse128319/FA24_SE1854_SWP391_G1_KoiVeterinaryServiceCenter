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

    public string IsRequestValid(LoginInformation info){
            if( info.Info == null )
                return "Missing parameter: Info";
            if( info.Password == null )
                return "Missing parameter: password";
            if( info.Info.Trim() == "" )
                return "Info cannot be empty";
            if( info.Password.Trim() == "" )
                return "Password cannot be empty";
            return null;
    }

    [HttpPost]
    public async Task<ActionResult<Account>> LoggingByEmail(LoginInformation info){
        try{
            string invalid = IsRequestValid(info);
            if( invalid != null )
                return BadRequest(invalid);

            var account = await _unitOfWork.AccountRepository.LoginAsync( info );
            if( account == null )
                return StatusCode(StatusCodes.Status401Unauthorized, "Invalid username or password!");

            var issuer = Configuration.GetConfiguration()["Jwt:Issuer"];
            var audience = Configuration.GetConfiguration()["Jwt:Audience"];
            var key = Encoding.ASCII.GetBytes(Configuration.GetConfiguration()["Jwt:Key"] ?? string.Empty);
            var claims = new List<Claim>{
                new Claim("Id", Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, account.Email),
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

            claims.Add(new Claim(ClaimTypes.Role, _unitOfWork.RoleRepository.getRoleName(account.RoleID)));
            var tokenDescriptor = new SecurityTokenDescriptor{
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(4),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials( new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var stringToken = tokenHandler.WriteToken(token);
            return Ok(stringToken);

        } catch ( Exception ex ){
            Console.WriteLine(ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

}

