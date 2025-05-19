
using System.ComponentModel.DataAnnotations;

namespace LiveFeedback.Core.DTOs
{
    public class PermissionDTO
    {
        [Required]
        public int Id { get; set; }
        public string PermissionName { get; set; }
        public string Description { get; set; }
    }
}
