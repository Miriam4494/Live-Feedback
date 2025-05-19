
using LiveFeedback.Core.DTOs;
using LiveFeedback.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LiveFeedback.Core.Interfaces.IServices
{
    public interface IRoleService
    {
        Task<List<RoleDTO>> GetAllRolesAsync();
        Task<RoleDTO> GetRoleByIdAsync(int id);
        Task<RoleDTO> AddRoleAsync(RoleDTO roleDto);
        Task<RoleDTO> UpdateRoleAsync(int id, RoleDTO roleDto);
        Task<bool> DeleteRoleAsync(int id);
        Task<List<RoleDTO>> GetRolesWithPermissionsAsync();
        Task<RoleDTO> GetRoleByNameAsync(string roleName);
    }

}

