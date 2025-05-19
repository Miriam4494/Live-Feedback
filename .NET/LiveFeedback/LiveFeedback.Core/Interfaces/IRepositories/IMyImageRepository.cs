using LiveFeedback.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LiveFeedback.Core.Interfaces.IRepositories
{
    public interface IMyImageRepository : IRepository<MyImage>
    {
        Task<List<MyImage>> GetAllAsync();
        Task<List<MyImage>> GetImagesByUserIdAsync(int userId);
        Task<List<MyImage>> GetImagesByQuestionIdAsync(int questionId);
    }
}