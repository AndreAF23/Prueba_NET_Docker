using Microsoft.AspNetCore.Mvc;
using Prueba_DockerNET.Data;
using Prueba_DockerNET.Models;
using System.Collections.Generic;

namespace Prueba_DockerNET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AsignaturaController : ControllerBase
    {
        [HttpGet]
        [Route("")]
        public IActionResult Get()
        {
            try
            {
                using var db = Conexion.CrearConexion();
                var repo = new AsignaturaRepository(db.ConnectionString);
                var data = repo.obtenerDATA();
                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al consultar la base de datos: {ex.Message}");
            }
        }
    }
}
