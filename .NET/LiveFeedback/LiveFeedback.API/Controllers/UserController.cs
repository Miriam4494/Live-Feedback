using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using LiveFeedback.API.PostModels;
using LiveFeedback.Core.DTOs;
using LiveFeedback.Core.Interfaces.IServices;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Security.Claims;
using LiveFeedback.Core.Entities;

namespace LiveFeedback.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public UserController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        // מנהל יכול לראות את כל המשתמשים
        [Authorize(Roles = "Admin")] // רק למנהל
        [HttpGet]
        public async Task<ActionResult<List<UserDTO>>> GetUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }



        [HttpGet("send")]

        public async Task<ActionResult<List<string>>> GetUsersSend()
        {
            var EmailUsers = await _userService.GetUsersSendAsyc();
            return Ok(EmailUsers);
        }

        // כל משתמש יכול לראות רק את עצמו
        //[Authorize]

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDTO>> GetUser(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null) return NotFound();
            return Ok(user);
        }
        [HttpGet("send/{id}")]
        public async Task<ActionResult<Send>> GetUserSend(int id)
        {
        
            var user = await _userService.GetUserSendByIdAsync(id);
            if (user == null) return NotFound();
            return Ok(user);
        }

        [HttpPost]
        [Authorize] 
        public async Task<ActionResult<UserDTO>> AddUser([FromBody] UserPostModel userPostModel)
        {
            var userDto = _mapper.Map<UserDTO>(userPostModel);
            userDto = await _userService.AddUserAsync(userDto);
            if (userDto == null) return BadRequest();

            return CreatedAtAction(nameof(GetUser), new { id = userDto.Id }, userDto);
        }
     

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<UserDTO>> UpdateUser(int id, [FromBody] UserPostModel userPostModel)
        {

            var userDto = _mapper.Map<UserDTO>(userPostModel);
            userDto = await _userService.UpdateUserAsync(id, userDto);
            if (userDto == null) return NotFound();

            return Ok(userDto);
        }


        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")] // רק למנהל
        //[Authorize] // כל משתמש יכול למחוק את עצמו
        public async Task<ActionResult<bool>> DeleteUser(int id)
        {
            var deleted = await _userService.DeleteUserAsync(id);
            if (!deleted) return NotFound();

            return Ok(true);
        }
    }
}




