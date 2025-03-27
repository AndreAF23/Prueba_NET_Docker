using Microsoft.AspNetCore.Mvc;

namespace Prueba_DockerNET.Controllers
{
    public class AsignaturaViewController : Controller
    {
        public IActionResult Index()
        {
            ViewBag.Title = "Listado de Asignaturas";
            return View(); // Renderiza la vista Index.cshtml
        }
    }

}