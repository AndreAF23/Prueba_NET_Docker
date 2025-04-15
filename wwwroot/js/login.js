//uso variable global base url
import { baseUrl } from './variablesGlobales.js';

document.getElementById("btnValidarUsuario").onclick = async (event) => {
    event.preventDefault(); // No se recarge cuando se clickea al boton : ya que es un form

    const pass = await validarUsuario();
    //console.log(pass);
    
    pass === true ? accederLogin() : denegarLogin();
};


async function validarUsuario ()
{
    var bypass;
    //llamada a api para validarUsuario
    await fetch(`${baseUrl}/api/login/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            usuario: $("#inputUsuario").val(),
            password: $("#inputPsswd").val()
        })
    })
    .then(res => { res.ok ? bypass=true : bypass=false })
    
    return bypass;
}

function accederLogin(){

    Swal.fire({
        title: "Usuario validado",
        text: "Acceso validado",
        icon: "success"
      });
    
    
    setTimeout(function(){
        window.location.href = `${baseUrl}/AsignaturaView`;
    }, 2000);
    
}

async function denegarLogin ()
{
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuario denegado",
        footer: 'Considere registro'
      });

    $("#form1Example13").val('');
    $("#form1Example23").val('');
}