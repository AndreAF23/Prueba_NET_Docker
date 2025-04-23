using Dapper;
using System.Data;
using Prueba_DockerNET.Models;

namespace Prueba_DockerNET.Data
{
    public class CargoRepository
    {
        
        public static async Task<List<Cargo>> obtenerCargos()
        {
            var conexion = Conexion.CrearConexion();
            var parametros = new DynamicParameters();
            parametros.Add("@OPC", 1);

            var resultado = await conexion.QueryAsync<Cargo>(
                "MNG_CARGO",
                parametros,
                commandType: CommandType.StoredProcedure
            );

            return resultado.ToList();
        }
    }
}
