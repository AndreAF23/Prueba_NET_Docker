using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Prueba_DockerNET.Data;
using Prueba_DockerNET.Models;

namespace Prueba_DockerNET.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AsignaturaController : ControllerBase
    {
        [HttpGet]
        [Route("")]
        public IEnumerable<TAsignaturas> Get()
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            string? cadenaConexion = config.GetConnectionString("DefaultConnection");

            AsignaturaRepository repo = new AsignaturaRepository(cadenaConexion);

            return repo.obtenerDATA();
        }
    }
}
