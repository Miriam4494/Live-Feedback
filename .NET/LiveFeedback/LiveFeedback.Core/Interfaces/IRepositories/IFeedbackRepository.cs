//using LiveFeedback.Core.Entities;
//using System.Collections.Generic;
//using System.Threading.Tasks;

//namespace LiveFeedback.Core.Interfaces.IRepositories

//{
//    public interface IFeedbackRepository : IRepository<Feedback>
//    {
//        Task<IEnumerable<Feedback>> GetFeedbacksWithQuestionsAsync();
//    }
//}
using LiveFeedback.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LiveFeedback.Core.Interfaces.IRepositories
{
    public interface IFeedbackRepository : IRepository<Feedback>
    {
        Task<List<Feedback>> GetFeedbacksWithQuestionsAsync();
    }
}

