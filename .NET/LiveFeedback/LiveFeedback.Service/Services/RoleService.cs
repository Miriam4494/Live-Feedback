
using LiveFeedback.Core.DTOs;
using LiveFeedback.Core.Entities;
using LiveFeedback.Core.Interfaces.IRepositories;
using LiveFeedback.Core.Interfaces.IServices;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LiveFeedback.Services.Services
{
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _roleRepository;
        private readonly IMapper _mapper;

        public RoleService(IRoleRepository roleRepository, IMapper mapper)
        {
            _roleRepository = roleRepository;
            _mapper = mapper;
        }

        public async Task<List<RoleDTO>> GetAllRolesAsync()
        {
            var roles = await _roleRepository.GetAllAsync();
            return _mapper.Map<List<RoleDTO>>(roles);
        }

        public async Task<RoleDTO> GetRoleByIdAsync(int id)
        {
            var role = await _roleRepository.GetByIdAsync(id);
            return _mapper.Map<RoleDTO>(role);
        }

        public async Task<RoleDTO> AddRoleAsync(RoleDTO roleDto)
        {
            var role = _mapper.Map<Role>(roleDto);
            await _roleRepository.AddAsync(role);
            return _mapper.Map<RoleDTO>(role);
        }

      
        public async Task<RoleDTO> UpdateRoleAsync(int id, RoleDTO roleDto)
        {
            // מציאת התמונה לפי ה-ID בלבד
            var role = await _roleRepository.GetByIdAsync(id);
            if (role == null) return null;

            // ממפים את ה-DTO ל-Entity (MyImage), אבל לא משפיעים על ה-ID
            Role entity = _mapper.Map<Role>(roleDto);

            // עושים Save רק לאחר המיפוי, לא מעדכנים את ה-ID
            await _roleRepository.UpdateAsync(id, entity);  // אל תעביר את ה-ID כאן

            return _mapper.Map<RoleDTO>(entity);
        }

        public async Task<bool> DeleteRoleAsync(int id)
        {
            var role = await _roleRepository.GetByIdAsync(id);
            if (role == null) return false;

            await _roleRepository.DeleteAsync(id);
            return true;
        }

        public async Task<List<RoleDTO>> GetRolesWithPermissionsAsync()
        {
            var roles = await _roleRepository.GetRolesWithPermissionsAsync();
            return _mapper.Map<List<RoleDTO>>(roles);
        }

        public async Task<RoleDTO> GetRoleByNameAsync(string roleName)
        {
            var role = await _roleRepository.GetRoleByNameAsync(roleName);
            return _mapper.Map<RoleDTO>(role);
        }
    }

}

