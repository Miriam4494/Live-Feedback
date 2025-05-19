using System.ComponentModel.DataAnnotations;

namespace LiveFeedback.API.PostModels
{
    public class PermissionPostModel
    {
        [Required]
        public string PermissionName { get; set; }
        public string Description { get; set; }
    }
}
