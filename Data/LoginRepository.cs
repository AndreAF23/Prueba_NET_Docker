using Dapper;
using Microsoft.Data.SqlClient;
using Prueba_DockerNET.Models;
using System.Data;

namespace Prueba_DockerNET.Data
{
    public static class LoginRepository
    {
        public static async Task<loginModel?> ObtenerDATA(string usuario)
        {
            var conexion = Conexion.CrearConexion();
            var parametros = new DynamicParameters();
            parametros.Add("@USUARIO", usuario);

            var resultado = await conexion.QueryFirstOrDefaultAsync<loginModel>(
                "ValidarUsuario",
                parametros,
                commandType: CommandType.StoredProcedure
            );

            return resultado;
        }
    }
}
