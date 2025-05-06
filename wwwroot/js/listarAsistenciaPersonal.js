let marcacionesEmpleado = [];

async function traerMarcaciones() {
  // Consultar marcaciones de usuario API y llenar marcacionesEmpleado
  marcacionesEmpleado = []
}

$(async function () {
  await traerMarcaciones();
});

$("#fechaConsulta").on("change", function () {
  
  var fechaSeleccionada = formatearFecha($(this).val());
  
  const filtro = marcacionesEmpleado.filter(item => {
    
    const fechaMarcacion = item.fechaMarcacion.split("T")[0];
    return fechaMarcacion === fechaSeleccionada;
  });
  console.log(filtro);
  
});

function formatearFecha(fechaISO) {
  if (!fechaISO || !fechaISO.includes("-")) return "";

  const [anio, mes, dia] = fechaISO.split("-");
  return `${dia}/${mes}/${anio}`;
}