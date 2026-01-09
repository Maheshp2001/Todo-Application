using System.ComponentModel.DataAnnotations;

namespace TodoListApi.Models
{
    public class TodoItem
    {
        [Key]
        public int TodoId { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;
        public bool IsCompleted { get; set; } = false;

        [Required]
        public string userMailId { get; set; } = string.Empty;
    }
}
