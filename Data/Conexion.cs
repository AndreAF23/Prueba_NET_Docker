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
            string connectionString = "Server=Prueba_NET_DOCKER.mssql.somee.com;Database=Prueba_NET_DOCKER;User Id=AndreAF23_SQLLogin_2;Password=2t3joratok;TrustServerCertificate=true;";

            //PARA DOCKER MANUAL CON .env
            //string connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");
            if (string.IsNullOrEmpty(connectionString))
                throw new InvalidOperationException("La cadena de conexión está vacía o no inicializada.");

            return new SqlConnection(connectionString);
            //prueba despliegue 3
        }
    }
}
