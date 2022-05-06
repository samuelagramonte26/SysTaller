
export  const handleFormCliente = (clienteDatos) => {
    let form = new FormData();
    form.append('nombre', clienteDatos.nombre);
    form.append('apellido', clienteDatos.apellido);
    form.append('cedula', clienteDatos.cedula);
    form.append('direccion', clienteDatos.direccion);
    form.append('telefono', clienteDatos.telefono);
  
    return form;
  }

  export  const handleFormVehiculo = (vehiculoDatos) => {
    let form = new FormData();
    form.append('matricula', vehiculoDatos.matricula);
    form.append('marca', vehiculoDatos.marca);
    form.append('modelo', vehiculoDatos.modelo);
    form.append('color', vehiculoDatos.color);
    form.append('clienteID', vehiculoDatos.clienteID);
  
    return form;
  }