
using LiveFeedback.Core.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LiveFeedback.Core.Interfaces.IServices
{
    public interface IFeedbackService
    {

        Task<List<FeedbackDTO>> GetAllFeedbacksAsync();
        Task<FeedbackDTO> GetFeedbackByIdAsync(int id);
        Task<FeedbackDTO> AddFeedbackAsync(FeedbackDTO model);
        Task<FeedbackDTO> UpdateFeedbackAsync(int id, FeedbackDTO model);
        Task<bool> DeleteFeedbackAsync(int id);
    }
}
