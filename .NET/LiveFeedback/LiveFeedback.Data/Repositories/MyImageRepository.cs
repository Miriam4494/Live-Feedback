
using LiveFeedback.Core.Entities;
using LiveFeedback.Core.Interfaces.IRepositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LiveFeedback.Data.Repositories
{
    public class MyImageRepository : Repository<MyImage>, IMyImageRepository
    {
        public MyImageRepository(DataContext context) : base(context) { }

        public async Task<List<MyImage>> GetImagesByUserIdAsync(int userId)
        {
            return await _context.MyImages
                .Where(i => i.UserId == userId)
                .ToListAsync();
        }

        public async Task<List<MyImage>> GetImagesByQuestionIdAsync(int questionId)
        {
            return await _context.MyImages
                .Where(i => i.QuestionId == questionId)
                .ToListAsync();
        }
    }
}


