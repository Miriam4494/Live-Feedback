
using System.ComponentModel.DataAnnotations;

namespace LiveFeedback.Core.DTOs
{
    public class FeedbackDTO
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int QuestionId { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
    }
}
