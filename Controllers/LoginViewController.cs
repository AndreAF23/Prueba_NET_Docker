using Microsoft.AspNetCore.Mvc;

namespace Prueba_DockerNET.Controllers
{
    public class LoginViewController : Controller
    {
        public IActionResult Index()
        {
            ViewBag.Title = "Login";
            return View();
        }
    }

}