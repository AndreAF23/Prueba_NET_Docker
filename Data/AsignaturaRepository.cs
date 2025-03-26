using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using Prueba_DockerNET.Models;
using Dapper;
using Microsoft.Data.SqlClient;

namespace Prueba_DockerNET.Data
{
    public class AsignaturaRepository
    {
        private readonly string _cadenaConexion;

        public AsignaturaRepository(string cadenaConexion)
        {
            _cadenaConexion = cadenaConexion;
        }

        public IEnumerable<TAsignaturas> obtenerDATA()
        {
            using (IDbConnection db = new SqlConnection(_cadenaConexion))
            {
                string sql = @"
                    SELECT TA.*
                    FROM TAsignaturas AS TA
                    INNER JOIN TProgramasAsignaturas AS TX ON TA.IdAsignatura = TX.IdAsignatura
                    INNER JOIN TProgramas AS TP ON TX.IdPrograma = TP.IdPrograma
                    WHERE TP.Programa = 'Grado en Enfermería';
                ";

                return db.Query<TAsignaturas>(sql).ToList();
            }
        }
    }
}