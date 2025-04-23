namespace Prueba_DockerNET.Models
{
    public class Empleado
    {
        public int id { get; set; }
        public required string dni { get; set; }
        public required string nombres { get; set; }
        public required string apellidoPaterno { get; set; }
        public required string apellidoMaterno { get; set; }
        public required int cargo { get; set; }
        public required int area { get; set; }
        public DateTime? fechaIngreso { get; set; }
        public required bool estado { get; set; }
        public DateTime? fechaRegistro { get; set; }

    }
}
