using Dapper;
using System.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Prueba_DockerNET.Data;
using Prueba_DockerNET.Models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Prueba_DockerNET.Controllers
{
    [Route("api/cargo")]
    public class CargoController : Controller
    {
        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult?> obtenerCargosData()
        {
            var data = await CargoRepository.obtenerCargos();
            if(data == null)
            {
                return NoContent();
            }

            return Ok(data);
        }

    }
}
