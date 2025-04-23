//uso variable global base url
import { baseUrl } from './variablesGlobales.js';

document.getElementById("btnValidarUsuario").onclick = async (event) => {
    event.preventDefault(); // No se recarge cuando se clickea al boton : ya que es un form

    const pass = await validarUsuario();
    //console.log(pass);
    
    pass === true ? accederLogin() : denegarLogin();
};

$("#btnGoToRegistro")[0].onclick = ()=>{
    $("#formLogin").css("display","none")
    $("#formRegistro").css("display","block")

    limpiarInputs();
}

$("#btnLoginVolver")[0].onclick = ()=>{
    //console.log("dsad");
    
    $("#formLogin").css("display","block")
    $("#formRegistro").css("display","none")
    limpiarInputs();
}

$("#btnRegistrarUsuario")[0].onclick = async(event)=>{
    event.preventDefault();

    const pass = await registrarUsuario();
    //console.log(pass);
    
    pass === true ? registroExitoso() : registroInvalido();
}

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

  



async function registrarUsuario ()
{
    var respuesta;

    //genero json
    const datos = {
        usuario: $("#inputUsuarioReg").val(),
        password: $("#inputPasswordReg").val(),
        estado: $("#flexSwitchCheckChecked").prop("checked"),
    };

    //console.log(JSON.stringify(datos));
    
    //llamada a api para registrarUsuario
    await fetch(`${baseUrl}/api/login/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    })
    .then(async res => {
        const json = await res.json();
        //console.log("Respuesta del backend:", json);
    
        if (!res.ok) {
            respuesta=false;
        }else{
            respuesta = true;
        }
    
    })
    return respuesta;
    
}

function accederLogin(){

    Swal.fire({
        title: "Usuario validado",
        text: "Acceso validado",
        icon: "success"
      });
    
    
    setTimeout(function(){
        window.location.href = `${baseUrl}/Menu`;
    }, 1500);
    limpiarInputs();
}

function denegarLogin ()
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

async function registroExitoso(){

    limpiarInputs();

    Swal.fire({
        title: "Usuario Registrado",
        text: "",
        icon: "success"
      });

    setTimeout(function(){
        $("#formLogin").css("display","block")
        $("#formRegistro").css("display","none")
    }, 2000);
    
}

function registroInvalido(){

    Swal.fire({
        icon: "error",
        title: "Error",
        text: "Usuario no se pudo registrar"
      });
    
}


$("#formLogin").on("keydown", async function (e) {

    if (e.key === "Enter" || e.keyCode === 13) {
        event.preventDefault();
        const pass = await validarUsuario();
        pass === true ? accederLogin() : denegarLogin();
    }
    
});

function limpiarInputs(){
    $("#inputUsuarioReg").val('');
    $("#inputPasswordReg").val('');
    $("#inputUsuario").val('');
    $("#inputPsswd").val('');
}
