using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Prueba_DockerNET.Data
{
    [Route("api/area")]
    public class AreaController : Controller
    {
        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult?> obtenerAreaData()
        {
            var data = await AreaRepository.obtenerAreas();
            if (data == null)
            {
                return NoContent();
            }

            return Ok(data);
        }

    }
}
