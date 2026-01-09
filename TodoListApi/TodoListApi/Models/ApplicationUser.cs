using Microsoft.AspNetCore.Identity;

namespace TodoListApi.Models
{
    public class ApplicationUser : IdentityUser
    {
        public DateTime UserRegisteredAt { get; set; } = DateTime.UtcNow;
    }
}
