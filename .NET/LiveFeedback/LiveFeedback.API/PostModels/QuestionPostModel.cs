using LiveFeedback.Core.DTOs;

namespace LiveFeedback.API.PostModels
{
    public class QuestionPostModel
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public DateTime CreatedAt { get; set; }
        public int? UsersUse { get; set; }



        public List<FeedbackPostModel>? Feedbacks { get; set; }
        public List<MyImagePostModel>? Images { get; set; }


    }
}
