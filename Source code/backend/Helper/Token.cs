#nullable disable
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

namespace Helper;
public class Token
{
    private string _issuer;
    private string _audience;
    private byte[] _key;
    private List<Claim> _claims;

    public Token()
    {
        _issuer = Configuration.GetConfiguration()["Jwt:Issuer"];
        _audience = Configuration.GetConfiguration()["Jwt:Audience"];
        _key = Encoding.ASCII.GetBytes(Configuration.GetConfiguration()["Jwt:Key"] ?? string.Empty);
        _claims = new List<Claim>();
    }

    public List<Claim> Claims
    {
        get => _claims;
        set => _claims = value;
    }

    public void AddClaim(Claim claim)
    {
        _claims.Add(claim);
    }

    public string GenerateToken(int time)
    {
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(_claims),
            Expires = DateTime.UtcNow.AddHours(time),
            Issuer = _issuer,
            Audience = _audience,
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(_key), SecurityAlgorithms.HmacSha256Signature)
        };
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

}
