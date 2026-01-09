using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TodoListApi.Models;
using TodoListApi.Models.Dtos;

namespace TodoListApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TodoController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;

        public TodoController(ApplicationDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("getAllTodos")]
        public async Task<IActionResult> getTodos()
        {
            try
            {
                var emailId = User.FindFirst(ClaimTypes.Email).Value.ToString();

                var lst = await _dbContext.TodoItems.Where(todos => todos.userMailId == emailId)
                    .ToListAsync();
                return Ok(lst);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [HttpPost("addTodo")]
        public async Task<IActionResult> addTodo(TodoDto newtodo)
        {
            try
            {
                var emailId = User.FindFirst(ClaimTypes.Email).Value.ToString();

                TodoItem todoItem = new TodoItem { Title = newtodo.Title, IsCompleted = newtodo.IsCompleted,userMailId= emailId };
                await _dbContext.TodoItems.AddAsync(todoItem);
                await _dbContext.SaveChangesAsync();
                return Ok(newtodo);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [HttpPut("updateTodo/{todoId}")]
        public async Task<IActionResult> editTodo(int todoId,TodoDto updateTodo)
        {
            try
            {
                var emailId = User.FindFirst(ClaimTypes.Email).Value.ToString();

                var todoItem = await _dbContext.TodoItems.FindAsync(todoId);
                if (todoItem ==null || todoItem.userMailId != emailId)
                {
                    return BadRequest("Todo Id not found");
                }
                todoItem.Title = updateTodo.Title;
                todoItem.IsCompleted = updateTodo.IsCompleted;

                await _dbContext.SaveChangesAsync();

                return Ok(todoItem.ToString()+" Updated successfully");
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [HttpDelete("deleteTodo/{todoId}")]
        public async Task<IActionResult> removeTodo(int todoId)
        {
            try
            {
                var emailId = User.FindFirst(ClaimTypes.Email).Value.ToString();

                var todoItem = await _dbContext.TodoItems.FindAsync(todoId);

                if(todoItem == null || todoItem.userMailId != emailId)
                {
                    return BadRequest("TodoId not found");
                }
                _dbContext.TodoItems.Remove(todoItem);
                await _dbContext.SaveChangesAsync();
                return Ok(todoId.ToString() + " removed successfully");
            }
            catch(Exception ex) { 
            return Problem(ex.Message);
            }
        }

        [HttpGet("getTodo/{todoId}")]
        public async Task<IActionResult> GetTodoById(int todoId)
        {
            try
            {
                var emailId = User.FindFirst(ClaimTypes.Email).Value.ToString();

                var todoItem = await _dbContext.TodoItems.FindAsync(todoId);
                if (todoItem == null || todoItem.userMailId != emailId)
                {
                    return BadRequest("Todo Id not found");
                }
                TodoDto todoDto = new TodoDto { Title = todoItem.Title, IsCompleted = todoItem.IsCompleted };

                return Ok(todoDto);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
    }
}
