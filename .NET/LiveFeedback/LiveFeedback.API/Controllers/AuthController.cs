using AutoMapper;
using LiveFeedback.API.PostModels;
using LiveFeedback.Core.DTOs;
using LiveFeedback.Core.Entities;
using LiveFeedback.Core.Interfaces.IServices;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace LiveFeedback.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly JwtService _jwtService;
        private readonly IUserService _userService; 
        private readonly IMapper _mapper; 
        public AuthController(JwtService jwtService, IUserService userService, IMapper mapper)
        {
            _jwtService = jwtService;
            _userService = userService;
            _mapper = mapper; 
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO model)
        {
            var userDto = await _userService.ValidateUser(model.Email, model.Password);

            if (userDto == null)
            {
                return Unauthorized(new { message = "UserName or password is worng" });
            }

            var user = _mapper.Map<User>(userDto);
            var token = _jwtService.GenerateJwtToken(user);

            return Ok(new
            {
                Token = token,
                User = userDto
                //new
                //{
                //    user.Id,
                //    user.Email,
                //    user.RoleId
                //}
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserPostModel model)
        {
            var existingUser = await _userService.GetUserByEmailAsync(model.Email);
            if (existingUser != null)
            {
                return BadRequest(new { message = "The email already exists in the system." });
            }

            var userDto = _mapper.Map<UserDTO>(model);

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.Password);

            userDto.Points = 5;
            userDto.RoleId = model.RoleId;
            userDto.Password = hashedPassword;

            var createdUser = await _userService.AddUserAsync(userDto);
            if (createdUser == null)
            {
                return BadRequest(new { message = "Registration failed." });
            }

            var token = _jwtService.GenerateJwtToken(_mapper.Map<User>(createdUser));

            return Ok(new
            {
                Token = token,
                User = new
                {
                    createdUser.Id,
                    createdUser.UserName,
                    createdUser.Email,
                    createdUser.RoleId,
                    createdUser.Points
                },
                Message = "You have successfully registered."
            });
        }
    }
}
