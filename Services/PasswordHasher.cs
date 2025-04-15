using System.Security.Cryptography;
using Prueba_DockerNET.Data;

namespace Prueba_DockerNET.Services
{
    public static class PasswordHasher
    {
        public static string HashPassword(string password, string salt)
        {
            var saltBytes = Convert.FromBase64String(salt);
            using (var pbkdf2 = new Rfc2898DeriveBytes(password, saltBytes, 100000))
            {
                byte[] hashBytes = pbkdf2.GetBytes(64);
                return Convert.ToBase64String(hashBytes);
            }
        }

        public static bool VerifyPassword(string inputPassword, string storedHash, string storedSalt)
        {
            string inputHash = HashPassword(inputPassword, storedSalt);
            return inputHash == storedHash;
        }

        public async static Task<bool> ValidarCredencialesAsync(string usuario, string password)
        {
            var user = await LoginRepository.ObtenerDATA(usuario);

            if (user == null || user.password_hash == null || user.password_salt==null)
                return false;

            return PasswordHasher.VerifyPassword(password, user.password_hash, user.password_salt);
        }

    }
}
