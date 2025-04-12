document.addEventListener("DOMContentLoaded", function () {
    
    
    const API_URL = `${baseUrl}/api/Asignatura`;
    //verificar url
    //console.log(API_URL)
    async function cargarAsignaturas() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("Error al obtener los datos.");
            
            const asignaturas = await response.json();
            console.log(asignaturas);
            
            const tabla = document.getElementById("tablaAsignaturas").getElementsByTagName("tbody")[0];

            //limpiar tabla
            tabla.innerHTML = "";

            asignaturas.forEach(asignatura => {
                let fila = tabla.insertRow();
                fila.innerHTML = `
                    <td>${asignatura.IdAsignatura}</td>
                    <td>${asignatura.CodAsignatura}</td>
                    <td>${asignatura.IdTipoAsignatura}</td>
                    <td>${asignatura.ECTS !== null && asignatura.ECTS !== undefined ? asignatura.ECTS.toFixed(2) : "Sin datos"}</td>
                    <td>${asignatura.Asignatura}</td>
                    <td>${asignatura.EsPersonalizable ? "Sí" : "No"}</td>
                    <td>${asignatura.Horas != null ? asignatura.Horas.toFixed(2) : "Sin datos"}</td>
                    <td>${asignatura.IdModalidad}</td>
                    <td>${asignatura.PublicarWeb ? "Sí" : "No"}</td>
                    <td>${formatearFecha(asignatura.FechaAlta)}</td>
                    <td>${asignatura.FechaModificacion ? formatearFecha(asignatura.FechaModificacion) : "Sin datos"}</td>
                    <td>${asignatura.IdUsuarioModificacion ?? "Sin datos"}</td>
                `;
            });
        } catch (error) {
            console.error("Error:", error);
        }
    }

    //formato de fecha - funcion
    function formatearFecha(fecha) {
        const date = new Date(fecha);
        return date.toLocaleDateString("es-ES", { year: 'numeric', month: '2-digit', day: '2-digit' });
    }
    
    cargarAsignaturas();
});
