//using System;
//using System.Collections.Generic;
//using System.ComponentModel.DataAnnotations;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace LiveFeedback.Core.Entities
//{
//    public class Feedback
//    {
//        [Key]
//        public int Id { get; set; }
//        public string Content { get; set; } 
//        public DateTime CreatedAt { get; set; } 
//        public int? QuestionId { get; set; } 
//        //public Question Question { get; set; } = null!;
//    }

//}
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LiveFeedback.Core.Entities
{
    public class Feedback
    {
        [Key]
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }


        [ForeignKey("Question")]
        public int QuestionId { get; set; }
        public Question Question { get; set; }
    }
}

