using LiveFeedback.Core.Entities;
using LiveFeedback.Core.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LiveFeedback.Core.Interfaces.IServices
{
    public interface IUserService
    {
        Task<List<UserDTO>> GetAllUsersAsync();
        Task<UserDTO> GetUserByIdAsync(int id);
        Task<UserDTO> AddUserAsync(UserDTO userDto);
        Task<UserDTO> UpdateUserAsync(int id, UserDTO userDto);
        Task<bool> DeleteUserAsync(int id);
        Task<UserDTO> AuthenticateAsync(string email, string password);  
        Task<UserDTO> GetUserByEmailAsync(string email);
        Task<Send> GetUserSendByIdAsync(int id);
        Task<List<string>> GetUsersSendAsyc();
        Task<UserDTO> ValidateUser(string email, string password);
    }

}

