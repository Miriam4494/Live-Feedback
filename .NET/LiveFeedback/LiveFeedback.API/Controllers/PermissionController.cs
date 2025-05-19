

using AutoMapper;
using LiveFeedback.Core.DTOs;
using LiveFeedback.Core.Interfaces.IServices;
using LiveFeedback.API.PostModels;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LiveFeedback.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermissionController : ControllerBase
    {
        private readonly IPermissionService _permissionService;
        private readonly IMapper _mapper;

        public PermissionController(IPermissionService permissionService, IMapper mapper)
        {
            _permissionService = permissionService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<PermissionDTO>>> GetPermissions()
        {
            var permissions = await _permissionService.GetAllPermissionsAsync();
            return Ok(permissions);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PermissionDTO>> GetPermission(int id)
        {
            var permission = await _permissionService.GetPermissionByIdAsync(id);
            if (permission == null) return NotFound();
            return Ok(permission);
        }

        [HttpPost]
        public async Task<ActionResult<PermissionDTO>> AddPermission([FromBody] PermissionPostModel permissionPostModel)
        {
            var permissionDto = _mapper.Map<PermissionDTO>(permissionPostModel);
            permissionDto = await _permissionService.AddPermissionAsync(permissionDto);
            if (permissionDto == null) return BadRequest();
            return CreatedAtAction(nameof(GetPermission), new { id = permissionDto.Id }, permissionDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<PermissionDTO>> UpdatePermission(int id, [FromBody] PermissionPostModel permissionPostModel)
        {
            var permissionDto = _mapper.Map<PermissionDTO>(permissionPostModel);
            permissionDto = await _permissionService.UpdatePermissionAsync(id, permissionDto);
            if (permissionDto == null) return NotFound();
            return Ok(permissionDto);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeletePermission(int id)
        {
            var result = await _permissionService.DeletePermissionAsync(id);
            if (!result) return NotFound();
            return Ok(result);
        }

        [HttpGet("name/{name}")]
        public async Task<ActionResult<List<PermissionDTO>>> GetPermissionsByName(string name)
        {
            var permissions = await _permissionService.GetPermissionsByNameAsync(name);
            return Ok(permissions);
        }

        [HttpGet("description/{description}")]
        public async Task<ActionResult<List<PermissionDTO>>> GetPermissionsByDescription(string description)
        {
            var permissions = await _permissionService.GetPermissionsByDescriptionAsync(description);
            return Ok(permissions);
        }
    }
}


