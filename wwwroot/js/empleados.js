//uso variable global base url
import { baseUrl } from './variablesGlobales.js';
import { cargosGlobal } from './menu.js';
import { areasGlobal } from './menu.js';

$("#viewListarPersonal")[0].onclick = async ()=>{
    await limpiarTablaDinamica();
    await llenarEmpleados();
}

async function llenarEmpleados() {
    var empleados = await consultarEmpleados();
    //console.log(empleados);
    
    empleados.forEach((emp) => {
        const fila = document.createElement("tr");
      
        fila.innerHTML = `
          <td>${emp.nombres}</td>
          <td>${emp.apellidoPaterno + " " + emp.apellidoMaterno}</td>
          <td>${emp.cargo}</td>
          <td>${emp.area}</td>
          <td>${emp.estado ? "Sí" : "No"}</td>
        `;
      
        const celdaBoton = document.createElement("td");
        const boton = document.createElement("button");
        boton.className = "btn btn-info";
        boton.textContent = "Editar";
        boton.addEventListener("click", () => {
          ejecucionBotonEditar(emp);
        });
      
        celdaBoton.appendChild(boton);
        fila.appendChild(celdaBoton);
        $("#tbodyDinamico")[0].appendChild(fila);
      });
}

function limpiarTablaDinamica(){
    $("#tbodyDinamico")[0].innerHTML='';

}

async function consultarEmpleados(){
    var empleados;
    await fetch(`${baseUrl}/api/empleado/listar`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            
        })
        .then(async res => {
            const json = await res.json();
            //console.log("Respuesta del backend:", json);
        
            if (!res.ok) {
                throw new Error("Error al consultar empleados");
            }else{
                empleados = Array.isArray(json) ? json : [json];
            }
        
        })
        return empleados;
}

function ejecucionBotonEditar(empleado){
    //alert(empleado.estado);
    const fecha = new Date(empleado.fechaIngreso).toISOString().split('T')[0];

    $("#inputEmpleadoId").val(empleado.id)
    $("#modalDNI").val(empleado.dni)
    $("#modalNombres").val(empleado.nombres)
    $("#modalApellidoPaterno").val(empleado.apellidoPaterno)
    $("#modalApellidoMaterno").val(empleado.apellidoMaterno)
    $("#modalActivo").prop("checked", empleado.estado);
    $("#modalFechaIngreso").val(fecha)
    
    $("#selectCargo").empty();
    $("#selectArea").empty();

    llenarSelectsModal();
    $("#selectCargo").val(empleado.id_cargo);
    $("#selectArea").val(empleado.id_area);

    const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
    modal.show();
}

$("#btnActualizarEmpleado").on("click", async function () {
    const empleadoActualizado = {
      id: parseInt($("#inputEmpleadoId").val()),
      dni: ($("#modalDNI").val()).trim(),
      nombres: ($("#modalNombres").val()).trim(),
      apellidoPaterno: ($("#modalApellidoPaterno").val()).trim(),
      apellidoMaterno: ($("#modalApellidoMaterno").val()).trim(),
      cargo: parseInt($("#selectCargo").val()),
      area: parseInt($("#selectArea").val()),
      estado: $("#modalActivo").prop("checked"),
      fechaIngreso: $("#modalFechaIngreso").val()
    };
    //console.log(empleadoActualizado);

    
    var resultado = await actualizarEmpleado(empleadoActualizado);
    if(resultado){
        const modalElement = document.getElementById("exampleModal");
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
        await limpiarTablaDinamica();
        await llenarEmpleados();
    }else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ocurrió un error"
        });
    }
    
});

async function llenarSelectsModal(){
    
    cargosGlobal.forEach(cargo => {
        $("#selectCargo").append(`<option value="${cargo.id}">${cargo.nombre}</option>`);
    });


    areasGlobal.forEach(area => {
        $("#selectArea").append(`<option value="${area.id}">${area.nombre}</option>`);
    });
}

async function actualizarEmpleado(empleadoActualizado){
    var respuesta;
    //console.log(empleadoActualizado)
    await fetch(`${baseUrl}/api/empleado/actualizar`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            empleadoActualizado
        )
        
    })
    .then(async res => {
        const json = await res.json();
        //console.log("Respuesta del backend:", json);
    
        if (!res.ok) {
            console.error("Error: ", json.message);
            respuesta=false;
        }else{
            respuesta=true;
        }
    
    })
    return respuesta;
}