namespace Prueba_DockerNET.Models
{
    public class Usuario
    {
        public int usuario_ID { get; set; }
        public required string nombres { get; set; }
        public required string apellido1 { get; set; }
        public required string apellido2 { get; set; }
        public required string usuario { get; set; }
        public required string password { get; set; }
        public string? password_hash { get; set; }
        public string? password_salt { get; set; }
        public DateTime? fechaCreacion { get; set; }
    }
}
