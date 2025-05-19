
using LiveFeedback.Core.Entities;

namespace LiveFeedback.Core.DTOs
{
    public class QuestionDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<MyImageDTO> Images { get; set; } // מכיל את האובייקטים המלאים של התמונות
        public int UserId { get; set; } // מכיל את המשתמש המלא
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public int? UsersUse { get; set; }


        public List<FeedbackDTO> Feedbacks { get; set; }

    }

}


