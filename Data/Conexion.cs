using Microsoft.Data.SqlClient;
using System.Data;

namespace Prueba_DockerNET.Data
{
    public static class Conexion
    {
        public static IDbConnection CrearConexion()
        {
            // Asegúrate que esto esté escrito tal cual

            // PARA VS .NET
            //string connectionString = "Server=host.docker.internal,1433;Database=Prueba_NET;User Id=sa;Password=lolpollo87;TrustServerCertificate=true;";

            //PARA DOCKER MANUAL CON .env
            string connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");
            if (string.IsNullOrEmpty(connectionString))
                throw new InvalidOperationException("La cadena de conexión está vacía o no inicializada.");

            return new SqlConnection(connectionString);
            //prueba despliegue 2
        }
    }
}
