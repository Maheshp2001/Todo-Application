
namespace TodoListApi.Models.Dtos
{
    public class TodoDto
    {
        public string Title { get; set; } = string.Empty;
        public bool IsCompleted { get; set; } = false;
    }
}
