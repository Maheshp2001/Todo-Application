using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TodoListApi.Models;
using TodoListApi.Models.Dtos;

namespace TodoListApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IJwtGenerator _jwtGenerator;

        public UserController(ApplicationDBContext dbContext,UserManager<ApplicationUser> userManager
            ,SignInManager<ApplicationUser> signInManager,IJwtGenerator jwtGenerator)
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtGenerator = jwtGenerator;
        }


        [HttpPost("register")]
        public async Task<IActionResult> UserRegister(UserDto registerUserDto)
        {
            try
            {
                if (registerUserDto.Email == null || registerUserDto.Password == null)
                {
                    return NotFound("Email or Password is not found");
                }

                ApplicationUser newUser = new ApplicationUser { Email = registerUserDto.Email
                ,UserName = registerUserDto.Email};

                var result = await _userManager.CreateAsync(newUser, registerUserDto.Password);
                if (result.Succeeded)
                {
                    await _signInManager.SignInAsync(newUser, isPersistent: false);
                    
                    string token = _jwtGenerator.createJwtToken(newUser);

                    return Ok(token);
                }
                else
                {
                    return Problem("Error in user registration");
                }
            }
            catch (Exception ex)
            {
                return Problem("Exception in catch block", ex.Message);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> UserLogin(UserDto loginUserDto)
        {
            try
            {
                if(loginUserDto.Email == null || loginUserDto.Password ==null)
                {
                    return NotFound("Email or Password is not found");
                }

                var result = await _signInManager.PasswordSignInAsync(loginUserDto.Email, loginUserDto.Password, 
                    isPersistent: false,lockoutOnFailure:false);

                if (result.Succeeded)
                {
                    ApplicationUser? user = await _userManager.FindByEmailAsync(loginUserDto.Email);
                    if (user == null)
                    {
                        return NotFound("User not found");
                    }
                    //sign in
                    await _signInManager.SignInAsync(user, isPersistent: false);

                    string token = _jwtGenerator.createJwtToken(user);

                    return Ok(token);
                }
                else {
                    return Problem("Invalid user mail or password");
                }
            }
            catch (Exception ex) { return Problem(ex.Message); }
        }

    }
}
