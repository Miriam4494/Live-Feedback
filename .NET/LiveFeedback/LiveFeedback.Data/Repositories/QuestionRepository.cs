
using LiveFeedback.Core.Entities;
using LiveFeedback.Core.Interfaces.IRepositories;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LiveFeedback.Data.Repositories
{
    public class QuestionRepository : Repository<Question>, IQuestionRepository
    {
        private readonly IMapper _mapper;

        public QuestionRepository(DataContext context, IMapper mapper) : base(context)
        {
            _mapper = mapper;
        }

        public async Task<List<Question>> GetQuestionsWithDetailsAsync()
        {
            var questions = await _context.Questions
                .Include(q => q.Images)
                .Include(q => q.Feedbacks)
                .Include(q => q.User)
                .ToListAsync();

            return questions; // המרה אוטומטית
            //return questions;
        }

        public async Task<Question> GetByIdAsync(int id)
        {
            var question = await _context.Questions
                .Include(q => q.Images)
                .Include(q => q.Feedbacks)
                .Include(q => q.User)
                .FirstOrDefaultAsync(q => q.Id == id);

            return question; // המרה אוטומטית
        }

        public async Task AddAsync(Question question)
        {
            await _context.Questions.AddAsync(question);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Question question)
        {
            _context.Questions.Update(question);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var question = await _context.Questions.FindAsync(id);
            if (question != null)
            {
                _context.Questions.Remove(question);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<Question>> GetQuestionsByTitleAsync(string title)
        {
            var questions = await _context.Questions
                .Where(q => q.Title.Contains(title))
                .ToListAsync();

            return _mapper.Map<List<Question>>(questions); // המרה אוטומטית
        }

        public async Task<List<Question>> GetQuestionsByContentAsync(string content)
        {
            var questions = await _context.Questions
                .Where(q => q.Content.Contains(content))
                .ToListAsync();

            return _mapper.Map<List<Question>>(questions); // המרה אוטומטית
        }
        public async Task<bool> UpdateUsersUseAsync(int id)
        {
            var question = await _context.Questions.FirstOrDefaultAsync(q => q.Id == id);

            if (question == null)
                return false;

            question.UsersUse += 1;
            await _context.SaveChangesAsync();
            return true;
        }

    }
}
