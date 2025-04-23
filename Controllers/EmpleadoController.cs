using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Prueba_DockerNET.Data;
using Prueba_DockerNET.Models;

namespace Prueba_DockerNET.Controllers
{
    [Route("api/empleado")]
    public class EmpleadoController : Controller
    {
        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult?> consultarEmpleados()
        {

            var data = await EmpleadoRepository.obtenerEmpleados();

            if (data == null)
            {
                return NoContent(); // 204: No hay empleados
            }

            return Ok(data);
        }

        [HttpPut]
        [Route("actualizar")]
        public async Task<IActionResult?> actualizarEmpleados([FromBody] Empleado empleado)
        {
            if (empleado == null)
            {
                return BadRequest(new { message = "Empleado Nulo" });
            }
            var data = await EmpleadoRepository.actualizarEmpleado(empleado);

            return data ? Ok(data) : BadRequest(new { message = "No se pudo actualizar"});
        }
    }
}
