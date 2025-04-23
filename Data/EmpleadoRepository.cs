using Dapper;
using Prueba_DockerNET.Models;
using System.Data;

namespace Prueba_DockerNET.Data
{
    public class EmpleadoRepository
    {
        public static async Task<List<EmpleadoVista>> obtenerEmpleados()
        {
            var conexion = Conexion.CrearConexion();
            

            var resultado = await conexion.QueryAsync<EmpleadoVista>(
                "SELECT * FROM view_listarEmpleados"
            );

            return resultado.ToList();
        }

        public static async Task<bool> actualizarEmpleado(Empleado empleado)
        {
            var conexion = Conexion.CrearConexion();
            var parametros = new DynamicParameters();
            parametros.Add("@OPC", 2);
            parametros.Add("@IDEMPLEADO", empleado.id);
            parametros.Add("@DNI", empleado.dni);
            parametros.Add("@NOMBRES", empleado.nombres);
            parametros.Add("@APPAT", empleado.apellidoPaterno);
            parametros.Add("@APMAT", empleado.apellidoMaterno);
            parametros.Add("@CARGO", empleado.cargo);
            parametros.Add("@AREA", empleado.area);
            parametros.Add("@ESTADO", empleado.estado);
            parametros.Add("@FECHAINGRESO", empleado.fechaIngreso);

            var resultado = await conexion.ExecuteAsync(
                "MNG_EMPLEADOS",
                parametros,
                commandType: CommandType.StoredProcedure
            );

            return resultado > 0;
        }
    }
}
