//uso variable global base url
import { baseUrl } from './variablesGlobales.js';

import { cargosGlobal } from './menu.js';
import { areasGlobal } from './menu.js';
import { activarVista } from './menu.js';

$("#btnviewRegistrarPersonal").on("click", () => {
    limpiarSelects();
    llenarSelects();
});

function limpiarSelects() {
    $("#inputRegistrarCargo").empty();
    $("#inputRegistrarArea").empty();
}


function llenarSelects() {

    cargosGlobal.forEach(cargo => {
        $("#inputRegistrarCargo").append(`<option value="${cargo.id}">${cargo.nombre}</option>`);
    });

    areasGlobal.forEach(area => {
        $("#inputRegistrarArea").append(`<option value="${area.id}">${area.nombre}</option>`);
    });
}

$("#btnRegistrarEmpleado").on("click", async function (event) {
    event.preventDefault();
    const empleadoRegistrado = {
        dni: ($("#inputRegistrarDNI").val()).trim(),
        nombres: ($("#inputRegistrarNombres").val()).trim(),
        apellidoPaterno: ($("#inputRegistrarApellidoPaterno").val()).trim(),
        apellidoMaterno: ($("#inputRegistrarApellidoMaterno").val()).trim(),
        cargo: parseInt($("#inputRegistrarCargo").val()),
        area: parseInt($("#inputRegistrarArea").val()),
        estado: $("#checkRegistrarActivo").prop("checked")
    };
    

    if (validarForm()) {
        //console.log(empleadoRegistrado);
        //var resultado = true;
        var resultado = await registrarEmpleado(empleadoRegistrado);
        if (resultado) {
            Swal.fire({
                title: "",
                text: "Empleado Registrado",
                icon: "success"
            });
            setTimeout(async function () {
                limpiarInputs();
                // funcion desactivarVistas() es importada de menu.js
                $("#viewListarPersonal").click()
                
            }, 1500);

        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ocurrió un error"
            });
        }
    } else {
        alert("Ingrese todos los campos")
    }



});

function limpiarInputs() {
    $("#inputRegistrarDNI").val('');
    $("#inputRegistrarNombres").val('');
    $("#inputRegistrarApellidoPaterno").val('');
    $("#inputRegistrarApellidoMaterno").val('');
}

function validarForm() {
    return !($("#inputRegistrarDNI").val() == "" || $("#inputRegistrarNombres").val() == "" || $("#inputRegistrarApellidoPaterno").val() == "" || $("#inputRegistrarApellidoMaterno").val() == "");
}

async function registrarEmpleado(empleadoRegistrado){
    var respuesta;
    //console.log(empleadoRegistrado)
    await fetch(`${baseUrl}/api/empleado/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            empleadoRegistrado
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
