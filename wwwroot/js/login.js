document.getElementById("btnValidarUsuario").onclick = async (event) => {
    event.preventDefault(); // Para evitar que el bot�n recargue la p�gina

    const pass = verificarAPI();
    console.log("vghvghfx  " + pass);

    pass === true ? accederLogin() : denegarLogin();
};


function verificarAPI ()
{
    const bypass=true;
    //se llama a la api y le asigna valor a bypass
    return bypass;
}
console.log("Andre");

function accederLogin(){

    Swal.fire({
        title: "Usuario validado",
        text: "Acceso validado",
        icon: "success"
      });

    setTimeout(function(){
        window.location.href = "AsignaturaVista.cshtml";
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