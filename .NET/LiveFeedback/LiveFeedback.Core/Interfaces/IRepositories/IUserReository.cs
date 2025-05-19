using LiveFeedback.Core.DTOs;
using LiveFeedback.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LiveFeedback.Core.Interfaces.IRepositories
{
    public interface IUserRepository : IRepository<User>
    {
        Task<List<UserDTO>> GetUsersWithDetailsAsync();
        Task<List<string>> GetUsersSendAsync();
        Task<UserDTO> GetUserByIdAsync(int id);
        Task<User> GetUserByEmailAsync(string email); 
        Task<Send> GetUserSendByIdAsync(int id);
        Task<bool> DeleteUserAsync(int userId);

    }
}
