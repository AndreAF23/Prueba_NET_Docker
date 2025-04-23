using Dapper;
using Prueba_DockerNET.Models;
using System.Data;

namespace Prueba_DockerNET.Data
{
    public class AreaRepository
    {
        public static async Task<List<Area>> obtenerAreas()
        {
            var conexion = Conexion.CrearConexion();
            var parametros = new DynamicParameters();
            parametros.Add("@OPC", 1);

            var resultado = await conexion.QueryAsync<Area>(
                "MNG_AREA",
                parametros,
                commandType: CommandType.StoredProcedure
            );

            return resultado.ToList();
        }
    }
}
