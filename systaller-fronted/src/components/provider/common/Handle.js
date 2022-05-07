
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
  export const handleFormMecanico = (mecanicoDatos)=>{
    let form = new FormData();
    form.append('nombre', mecanicoDatos.nombre);
    form.append('apellido', mecanicoDatos.apellido);
    form.append('cedula', mecanicoDatos.cedula);
    form.append('fechaNacimiento', mecanicoDatos.fechaNacimiento);
   
    return form;
  }

  export  const handleFormTaller = (tallerDatos) => {
    let form = new FormData();
    form.append('nombre', tallerDatos.nombre);
    form.append('correo', tallerDatos.correo);
    form.append('rnc', tallerDatos.rnc);
    form.append('direccion', tallerDatos.direccion);
    form.append('telefono', tallerDatos.telefono);
  
    return form;
  }