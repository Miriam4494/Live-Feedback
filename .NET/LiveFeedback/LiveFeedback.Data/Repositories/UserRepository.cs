
using LiveFeedback.Core.Entities;
using LiveFeedback.Core.Interfaces.IRepositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using LiveFeedback.Core.DTOs;

namespace LiveFeedback.Data.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        private readonly IMapper _mapper;

        public UserRepository(DataContext context, IMapper mapper) : base(context)
        {
            _mapper = mapper;
        }

        public async Task<List<UserDTO>> GetUsersWithDetailsAsync()
        {
            var users = await _context.Users
                .Include(u => u.Questions)
                .Include(u => u.UserRole)
                .ToListAsync();

            return _mapper.Map<List<UserDTO>>(users);
        }
        public async Task<List<string>> GetUsersSendAsync()
        {
            var users = await _context.Users.ToListAsync();

            var EmailsUsers = users
                .Where(u => (bool)u.SendQuestion)
                .Select(u => u.Email)
                .ToList();

            return EmailsUsers;
        }

        
        public async Task<UserDTO> GetUserByIdAsync(int id)
        {
            var user = await _context.Users
                .Include(u => u.UserRole)
                .Include(u => u.Questions).ThenInclude(q=>q.Images)
                .Include(u=>u.Questions).ThenInclude(q=>q.Feedbacks)
                
                .FirstOrDefaultAsync(u => u.Id == id);

            return user == null ? null : _mapper.Map<UserDTO>(user);
        }
        public async Task<Send> GetUserSendByIdAsync(int id)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == id);
            if(user == null)
                return null;
            return new Send { SendQuestion = (bool)user.SendQuestion, SendFeedback=(bool)user.SendFeedback};
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            var res = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            return res;
        }

        public async Task<bool> DeleteUserAsync(int userId)
        {
            var user = await _context.Users
                .Include(u => u.Questions)
                    .ThenInclude(q => q.Feedbacks)
                .Include(u => u.Questions)
                    .ThenInclude(q => q.Images)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
                return false;

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }
        //public async Task DeleteUserAsync(int id)
        //{
        //    var user = await _context.Users.FindAsync(id);
        //    if (user != null)
        //    {
        //        _context.Users.Remove(user);
        //        await _context.SaveChangesAsync();
        //    }
        //}
    }
}
