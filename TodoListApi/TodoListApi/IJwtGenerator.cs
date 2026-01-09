using TodoListApi.Models;

namespace TodoListApi
{
    public interface IJwtGenerator
    {
        public string createJwtToken(ApplicationUser user);
    }
}
