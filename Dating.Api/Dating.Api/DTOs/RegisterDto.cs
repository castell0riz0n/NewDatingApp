using System.ComponentModel.DataAnnotations;

namespace Dating.Api.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}