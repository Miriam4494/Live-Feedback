using LiveFeedback.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LiveFeedback.Core.Interfaces.IRepositories
{
    public interface IQuestionRepository : IRepository<Question>
    {
         Task<List<Question>> GetQuestionsWithDetailsAsync();
        Task<List<Question>> GetQuestionsByTitleAsync(string title);
        Task<List<Question>> GetQuestionsByContentAsync(string content);
        Task<bool> UpdateUsersUseAsync(int id);
    }
}

