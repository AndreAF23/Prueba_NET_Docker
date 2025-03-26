using System;
using System.Collections.Generic;
using System.Configuration;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using Microsoft.Extensions.Configuration;

namespace Prueba_DockerNET.Data
{
    public class Conexion
    {
        private readonly IConfiguration _configuration;
        private readonly string? _connectionString;

        public Conexion(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("DefaultConnection");
        }

        public IDbConnection CrearConexion()
        {
            return new SqlConnection(_connectionString);
        }
    }
}