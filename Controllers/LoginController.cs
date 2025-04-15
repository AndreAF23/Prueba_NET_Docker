using Microsoft.AspNetCore.Mvc;
using Prueba_DockerNET.Models;
using Prueba_DockerNET.Services;

namespace Prueba_DockerNET.Controllers
{
    [ApiController]
    [Route("api/login")]
    public class LoginController : ControllerBase
    {
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] loginModel lm)
        {
            if (string.IsNullOrEmpty(lm.usuario) || string.IsNullOrEmpty(lm.password))
            {
                return BadRequest(new { message = "Debe ingresar usuario y contraseña." });
            }

            bool accesoValido = await PasswordHasher.ValidarCredencialesAsync(lm.usuario, lm.password);

            if (accesoValido)
            {
                return Ok(new { message = "Acceso autorizado" });
            }
            else
            {
                return Unauthorized(new { message = "Credenciales incorrectas" });
            }
        }
    }
}
