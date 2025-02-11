using AuthApplication.Data;
using AuthApplication.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuthApplication.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest(new { status = "error", message = "Email and Password are required." });
            }

            // Query the database for a user with matching email and password.
            var user = await _context.Users.Include(u => u.City)
                .Include(u => u.Area)
                    .ThenInclude(a => a.City)
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Email == request.Email && u.Password == request.Password);

            if (user == null)
            {
                return NotFound(new { status = "error", message = "Invalid email or password." });
            }

            // Build the response object
            var response = new LoginResponse
            {
                Status = "success",
                Data = new UserData
                {
                    UserId = user.UserId,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    PhoneNo = user.PhoneNo,
                    Password = user.Password,
                    Email = user.Email,
                    AadharNo = user.AadharNo,
                    Address = user.Address,
                    City = user.City != null ? new CityDto
                    {
                        CityId = user.City.CityId,
                        CityName = user.City.CityName
                    } : null,
                    Area = user.Area != null ? new AreaDto
                    {
                        AreaId = user.Area.AreaId,
                        AreaName = user.Area.AreaName,
                        City = user.Area.City != null ? new CityDto
                        {
                            CityId = user.Area.City.CityId,
                            CityName = user.Area.City.CityName
                        } : null
                    } : null,
                    Role = user.Role != null ? new RoleDto
                    {
                        RoleId = user.Role.RoleId,
                        RoleName = user.Role.RoleName
                    } : null
                }
            };

            return Ok(response);
        }
    }
}
