using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LiveFeedback.Core.Entities
{
    //public enum TypesOfRoles { ADMIN, USER }

    public class Role
    {
        [Key]
        public int Id { get; set; }
        public string RoleName { get; set; }
        public string Description { get; set; }
        public List<Permission> Permissions { get; set; }

        //[ForeignKey(nameof(UserId))]
        //public int UserId { get; set; } 
        //public User User { get; set; }
        public List<User> Users { get; set; }
        public DateTime CreateAt { get; set; }


       

}

}
