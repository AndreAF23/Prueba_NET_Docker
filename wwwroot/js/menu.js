export var cargosGlobal;
export var areasGlobal;
document.addEventListener('DOMContentLoaded', async function() {
    //crea las variables globales cuando carge la pagina
    await datosGlobales();
});

//uso variable global base url
import { baseUrl } from './variablesGlobales.js';


async function datosGlobales() {
    
    //llena los cargos en variable global
    await fetch(`${baseUrl}/api/cargo/listar`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        
    })
    .then(async res => {
        const json = await res.json();
        //console.log("Respuesta del backend:", json);
    
        if (!res.ok) {
            throw new Error("Error al consultar cargos");
        }else{
            cargosGlobal = Array.isArray(json) ? json : [json];
        }
    
    })


    //llena las areas en variable global
    await fetch(`${baseUrl}/api/area/listar`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        
    })
    .then(async res => {
        const json = await res.json();
        //console.log("Respuesta del backend:", json);
    
        if (!res.ok) {
            throw new Error("Error al consultar cargos");
        }else{
            areasGlobal = Array.isArray(json) ? json : [json];
        }
    
    })

}

$(document).ready(function () {
    $("#btnViewMenuPrincipal").on("click", async () => {
        desactivarVistas();
        $("#viewMenuPrincipal").css("display", "block");
    });

    $("#viewListarPersonal").on("click", () => {
        desactivarVistas();
        $("#viewPersonal").css("display", "block");
    });
});


function desactivarVistas() {
    $("#viewPersonal").css("display","none");
    $("#viewMenuPrincipal").css("display","none");
}