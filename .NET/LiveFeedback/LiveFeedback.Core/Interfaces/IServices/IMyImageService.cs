

using LiveFeedback.Core.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LiveFeedback.Core.Interfaces.IServices
{
    public interface IMyImageService
    {
        Task<List<MyImageDTO>> GetAllImagesAsync();
        Task<MyImageDTO> GetImageByIdAsync(int id);
        Task<MyImageDTO> AddImageAsync(MyImageDTO imageDto);
        Task<MyImageDTO> UpdateImageAsync(int id, MyImageDTO imageDto);
        Task<bool> DeleteImageAsync(int id);
        Task<List<MyImageDTO>> GetImagesByUserIdAsync(int userId);
        Task<List<MyImageDTO>> GetImagesByQuestionIdAsync(int questionId);
    }
}
