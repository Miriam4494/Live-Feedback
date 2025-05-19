
using AutoMapper;
using LiveFeedback.Core.DTOs;
using LiveFeedback.Core.Entities;
using LiveFeedback.Core.Interfaces.IRepositories;
using LiveFeedback.Core.Interfaces.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LiveFeedback.Services.Services
{


    public class QuestionService : IQuestionService
    {
        private readonly IQuestionRepository _questionRepository;
        private readonly IMapper _mapper;


        public QuestionService(IQuestionRepository questionRepository, IMapper mapper)
        {
            _questionRepository = questionRepository;
            _mapper = mapper;
        }

        public async Task<List<QuestionDTO>> GetAllQuestionsAsync()
        {
            var questions = await _questionRepository.GetQuestionsWithDetailsAsync();
            return _mapper.Map<List<QuestionDTO>>(questions);
        }

        public async Task<QuestionDTO> GetQuestionByIdAsync(int id)
        {
            var question = await _questionRepository.GetByIdAsync(id);
            return _mapper.Map<QuestionDTO>(question);
        }

        public async Task<QuestionDTO> AddQuestionAsync(QuestionDTO questionDto)
        {
            var question = _mapper.Map<Question>(questionDto);
            await _questionRepository.AddAsync(question);
            return _mapper.Map<QuestionDTO>(question);
        }


        public async Task<QuestionDTO> UpdateQuestionAsync(int id, QuestionDTO questionDto)
        {
            // מציאת התמונה לפי ה-ID בלבד
            var question = await _questionRepository.GetByIdAsync(id);
            if (question == null) return null;

            // ממפים את ה-DTO ל-Entity (MyImage), אבל לא משפיעים על ה-ID
            Question entity = _mapper.Map<Question>(questionDto);

            // עושים Save רק לאחר המיפוי, לא מעדכנים את ה-ID
            await _questionRepository.UpdateAsync(id, entity);  // אל תעביר את ה-ID כאן

            return _mapper.Map<QuestionDTO>(entity);
        }
        public async Task<bool> UpdateUserUseAsync(int id)
        {
            var question = await _questionRepository.GetByIdAsync(id);
            if (question == null) return false;

            await _questionRepository.UpdateUsersUseAsync(id);
            return true;
            
        }

        public async Task<bool> DeleteQuestionAsync(int id)
        {
            var question = await _questionRepository.GetByIdAsync(id);
            if (question == null) return false;

            await _questionRepository.DeleteAsync(id);
            return true;
        }

        public async Task<List<QuestionDTO>> GetQuestionsByTitleAsync(string title)
        {
            var questions = await _questionRepository.GetQuestionsByTitleAsync(title);
            return _mapper.Map<List<QuestionDTO>>(questions);
        }

        public async Task<List<QuestionDTO>> GetQuestionsByContentAsync(string content)
        {
            var questions = await _questionRepository.GetQuestionsByContentAsync(content);
            return _mapper.Map<List<QuestionDTO>>(questions);
        }
    }
    //}
}
