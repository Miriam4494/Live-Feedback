using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LiveFeedback.Core.Entities
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int Points { get; set; }


        public bool? SendQuestion { get; set; }
        public bool? SendFeedback { get; set; }


        public int RoleId { get; set; }
        public Role UserRole { get; set; }
        public List<Question> Questions { get; set; }
    }
}

