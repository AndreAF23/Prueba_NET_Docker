namespace Prueba_DockerNET.Models
{
    public class EmpleadoVista
    {
        public int id { get; set; }
        public required string dni { get; set; }
        public required string nombres { get; set; }
        public required string apellidoPaterno { get; set; }
        public required string apellidoMaterno { get; set; }
        public required string cargo { get; set; }
        public int id_cargo{ get; set; }
        public int id_area { get; set; }
        public required string area { get; set; }
        public DateTime? fechaIngreso { get; set; }
        public required bool estado { get; set; }
        public DateTime? fechaRegistro { get; set; }
    }
}
