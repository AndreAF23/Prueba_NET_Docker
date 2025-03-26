namespace Prueba_DockerNET.Models
{
    public class TAsignaturas
    {
        public int IdAsignatura { get; set; }
        public string? CodAsignatura { get; set; }
        public int IdTipoAsignatura { get; set; }
        public double ECTS { get; set; }
        public string? Asignatura { get; set; }
        public bool EsPersonalizable { get; set; }
        public double? Horas { get; set; }
        public int IdModalidad { get; set; }
        public bool PublicarWeb { get; set; }
        public DateTime FechaAlta { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public int? IdUsuarioModificacion { get; set; }
    }
}
