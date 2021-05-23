using Dating.Api.Entities;

namespace Dating.Api.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}