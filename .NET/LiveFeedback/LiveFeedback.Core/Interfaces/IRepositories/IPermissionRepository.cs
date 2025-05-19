using LiveFeedback.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LiveFeedback.Core.Interfaces.IRepositories
{
    public interface IPermissionRepository : IRepository<Permission>
    {
        Task<List<Permission>> GetPermissionsByNameAsync(string name);
        Task<List<Permission>> GetPermissionsByDescriptionAsync(string description);
    }
}

