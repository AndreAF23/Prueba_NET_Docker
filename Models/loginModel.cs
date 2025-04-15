namespace Prueba_DockerNET.Models
{
    public class loginModel
    {
        public string? usuario { get; set; }
        public string? password { get; set; }
        public string? password_hash { get; set; }
        public string? password_salt { get; set; }
    }
}
