using TaskManagerApi.Models;

namespace TaskManagerApi.Services
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}
