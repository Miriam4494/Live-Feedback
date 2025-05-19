
using LiveFeedback.Core.Entities;

namespace LiveFeedback.Core.DTOs
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int Points { get; set; }

        public bool? SendQuestion { get; set; }
        public bool? SendFeedback { get; set; }
        public int RoleId { get; set; }

        public List<Question> Questions { get; set; }

    }
}
