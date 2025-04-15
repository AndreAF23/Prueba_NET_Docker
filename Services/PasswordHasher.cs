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

        public static (string passwordHash, string passwordSalt) HashPasswordConSalt(string plainPassword)
        {
            // 1. Generar un salt aleatorio de 16 bytes
            byte[] saltBytes = new byte[16];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(saltBytes);
            }

            // 2. Derivar la clave (hashear)
            using (var pbkdf2 = new Rfc2898DeriveBytes(plainPassword, saltBytes, 100000))
            {
                byte[] hashBytes = pbkdf2.GetBytes(64); // 64 bytes = 512 bits

                // 3. Convertir a base64 para guardar como string
                string hashBase64 = Convert.ToBase64String(hashBytes);
                string saltBase64 = Convert.ToBase64String(saltBytes);

                return (hashBase64, saltBase64);
            }
        }

    }
}
