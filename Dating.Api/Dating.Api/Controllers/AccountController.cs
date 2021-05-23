using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Dating.Api.Data;
using Dating.Api.DTOs;
using Dating.Api.Entities;
using Dating.Api.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Dating.Api.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        public AccountController(DataContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost]
        public async Task<ActionResult<UserDto>> Register(RegisterDto input)
        {
            if (await UserExists(input.Username))
            {
                return BadRequest("Username is taken");
            }
            using var hmac = new HMACSHA512();
            var user = new AppUser
            {
                UserName = input.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(input.Password)),
                PasswordSalt = hmac.Key
            };

            _context.AppUsers.Add(user);

            await _context.SaveChangesAsync();

            return Ok(new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            });
        }

        [HttpPost]
        public async Task<ActionResult<UserDto>> Login(LoginDto input)
        {
            var user = await _context.AppUsers.SingleOrDefaultAsync(a => a.UserName == input.Username.ToLower());

            if (user == null)
            {
                return BadRequest("Invalid username");
            }

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(input.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i])
                {
                    return Unauthorized("Invalid password!");
                }
            }

            return Ok(new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            });
        }

        private async Task<bool> UserExists(string username)
        {
            return await _context.AppUsers.AnyAsync(a => a.UserName == username.ToLower());
        }
    }
}