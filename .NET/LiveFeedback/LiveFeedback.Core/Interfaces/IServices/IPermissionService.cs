
using LiveFeedback.Core.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LiveFeedback.Core.Interfaces.IServices
{
    public interface IPermissionService
    {
        Task<List<PermissionDTO>> GetAllPermissionsAsync();
        Task<PermissionDTO> GetPermissionByIdAsync(int id);
        Task<PermissionDTO> AddPermissionAsync(PermissionDTO permissionDto);
        Task<PermissionDTO> UpdatePermissionAsync(int id, PermissionDTO permissionDto);
        Task<bool> DeletePermissionAsync(int id);
        Task<List<PermissionDTO>> GetPermissionsByNameAsync(string name);
        Task<List<PermissionDTO>> GetPermissionsByDescriptionAsync(string description);
    }
}
