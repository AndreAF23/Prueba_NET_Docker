using Dapper;
using Microsoft.Data.SqlClient;
using Prueba_DockerNET.Models;
using Prueba_DockerNET.Services;
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

        public static async Task<bool?> registrarUsuario(Usuario user)
        {
            var (hash,salt) = PasswordHasher.HashPasswordConSalt(user.password);
            var conexion = Conexion.CrearConexion();
            var parametros = new DynamicParameters();
            parametros.Add("@NOMBRES", user.nombres);
            parametros.Add("@APELLIDO1", user.apellido1);
            parametros.Add("@APELLIDO2", user.apellido2);
            parametros.Add("@USUARIO", user.usuario);
            parametros.Add("@PASSWORD_HASH", hash);
            parametros.Add("@PASSWORD_SALT", salt);

            var resultado = await conexion.QueryFirstOrDefaultAsync<bool>(
                "CrearUsuario",
                parametros,
                commandType: CommandType.StoredProcedure
            );

            return resultado;
        }

    }
}
