//using LiveFeedback.Core.Entities;
//using Microsoft.Extensions.Configuration;
//using Microsoft.IdentityModel.Tokens;
//using System;
//using System.Collections.Generic;
//using System.IdentityModel.Tokens.Jwt;
//using System.Linq;
//using System.Security.Claims;
//using System.Text;

//namespace LiveFeedback.Service.Services
//{
//    public class JwtService
//    {
//        private readonly IConfiguration _configuration;

//        public JwtService(IConfiguration configuration)
//        {
//            _configuration = configuration;
//        }

//        public string GenerateJwtToken(User user)
//        {
//            var tokenHandler = new JwtSecurityTokenHandler();
//            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

//            var claims = new List<Claim>
//            {
//                new Claim(ClaimTypes.Name, user.UserName),  // שינוי ל-UserName
//                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
//            };

//            // בדיקה אם יש תפקידים למשתמש והוספה לרשימת ה-Claims
//            if (user.UserRoles != null)
//            {
//                claims.AddRange(user.UserRoles.Select(role => new Claim(ClaimTypes.Role, role.RoleName)));
//            }

//            var tokenDescriptor = new SecurityTokenDescriptor
//            {
//                Subject = new ClaimsIdentity(claims),
//                Expires = DateTime.UtcNow.AddHours(3),
//                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
//            };

//            var token = tokenHandler.CreateToken(tokenDescriptor);
//            return tokenHandler.WriteToken(token);
//        }
//    }
//}
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using LiveFeedback.Core.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

public class JwtService
{
    private readonly IConfiguration _config;

    public JwtService(IConfiguration config)
    {
        _config = config;
    }

    public string GenerateJwtToken(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        //var claims = new List<Claim> {
        //    new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()), // מזהה המשתמש
        //    new Claim(JwtRegisteredClaimNames.Email, user.Email), // אימייל
        //    new Claim(ClaimTypes.Role, user.UserRole.RoleName), // תפקיד המשתמש

        //    //new Claim(ClaimTypes.Role, user.RoleId == 1 ? "Admin" : "User"), // תפקיד המשתמש
        //    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()) // מזהה ייחודי לטוקן};
        //};
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()), // מזהה המשתמש
            new Claim(JwtRegisteredClaimNames.Email, user.Email), // אימייל
            new Claim(ClaimTypes.Role, user.RoleId == 2 ? "Admin" : "User"), // תפקיד המשתמש
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()) // מזהה ייחודי לטוקן
        };

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

