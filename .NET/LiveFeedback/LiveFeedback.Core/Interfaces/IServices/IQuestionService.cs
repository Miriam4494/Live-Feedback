
using LiveFeedback.Core.DTOs;
using LiveFeedback.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LiveFeedback.Core.Interfaces.IServices
{
    public interface IQuestionService
    {
        Task<List<QuestionDTO>> GetAllQuestionsAsync();
        Task<QuestionDTO> GetQuestionByIdAsync(int id);
        Task<QuestionDTO> AddQuestionAsync(QuestionDTO questionDto);
        Task<QuestionDTO> UpdateQuestionAsync(int id, QuestionDTO questionDto);
        Task<bool> DeleteQuestionAsync(int id);
        Task<List<QuestionDTO>> GetQuestionsByTitleAsync(string title);
        Task<List<QuestionDTO>> GetQuestionsByContentAsync(string content);
        Task<bool> UpdateUserUseAsync(int id);
    }

}
