
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
  export  const handleFormCategoria = (categoriaDatos) => {
    let form = new FormData();
    form.append('categoria', categoriaDatos.categoria);
    form.append('descripcion', categoriaDatos.descripcion);
   
  
    return form;
  }
  export  const handleFormProducto = (productoDatos) => {
    let form = new FormData();
    form.append('producto', productoDatos.producto);
    form.append('montoInicial', productoDatos.montoInicial);
    form.append('categoriaID', productoDatos.categoriaID); 
    return form;
  }
  export  const handleFormReparacion = (reparacionDatos) => {
    let form = new FormData();
    form.append('clienteID', reparacionDatos.clienteID);
    form.append('vehiculoID', reparacionDatos.vehiculoID);
    form.append('comentario', reparacionDatos.comentario); 
    form.append('fechaEntrada', reparacionDatos.fechaEntrada); 
    return form;
  }

  export const handleFormMecanicoReparacion = (asignanionDatos)=>{
    let form = new FormData();
    form.append('reparacionID',asignanionDatos.reparacionID);
    form.append('mecanicoID',asignanionDatos.mecanicoID);
    return form;
  }
  export const handleFormDetalleProductos = (detalleProductos)=>{
    let form = new FormData();
    form.append('productoID',detalleProductos.productoID);
    form.append('cantidad',detalleProductos.cantidad);
    form.append('reparacionID',detalleProductos.reparacionID);
    form.append('precio',detalleProductos.precio);
    return form;
  }