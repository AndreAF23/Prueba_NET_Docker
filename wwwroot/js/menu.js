export var cargosGlobal;
export var areasGlobal;
document.addEventListener('DOMContentLoaded', async function () {
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
            } else {
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
            } else {
                areasGlobal = Array.isArray(json) ? json : [json];
            }

        })

}

$(document).ready(function () {
    $("#btnViewMenuPrincipal").on("click", async () => {
        activarVista("viewMenuPrincipal")

    });

    $("#viewListarPersonal").on("click", () => {
        activarVista("viewPersonal")
    });

    $("#btnviewRegistrarPersonal").on("click", () => {
        activarVista("viewRegistrarPersonal")
    });

    $("#btnAsistenciasPersonal").on("click", () => {
        activarVista("viewAsistenciasPersonal")
    });
});

// FUNCIONES GLOBALES

export async function desactivarVistas() {
    $("#viewMenuPrincipal").css("display", "none");
    $("#viewPersonal").css("display", "none");
    $("#viewRegistrarPersonal").css("display", "none");
    $("#viewAsistenciasPersonal").css("display", "none");
}

export async function activarVista(vista) {
    await desactivarVistas();
    $("#" + vista).css("display", "block");
}
