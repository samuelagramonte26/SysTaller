export const ClientesColumns = [
    {
        id: 'id',
        label: "ID"
    },
    {
        id: 'nombre',
        label: "NOMBRE"
    },
    {
        id: 'apellido',
        label: "APELLIDO"
    },
    {
        id: 'cedula',
        label: "CEDULA"
    },
    {
        id: 'telefono',
        label: "TELEFONO"
    },
    {
        id: 'direccion',
        label: "DIRECCION"
    }

];
export const VehiculosColumns = [
    {
        id: 'id',
        label: "ID"
    },
    {
        id: 'color',
        label: "COLOR"
    },
    {
        id: 'matricula',
        label: "MATRICULA"
    },
    {
        id: 'marca',
        label: "MARCA"
    },
    {
        id: 'modelo',
        label: "MODELO"
    },
    {
        id: 'cliente',
        label: "DUEÑO"
    }

];

export const MecanicosColumns = [
    {
        id: 'id',
        label: "ID"
    },
    {
        id: 'nombre',
        label: "NOMBRE"
    },
    {
        id: 'apellido',
        label: "APELLIDO"
    },
    {
        id: 'fechaNacimiento',
        label: "FECHA NACIMIENTO"
    },
    {
        id: 'cedula',
        label: "CEDULA"
    }

];

export const CategoriasProductosColumns = [
    {
        id: 'id',
        label: "ID"
    },
    {
        id: 'categoria',
        label: "CATEGORIA"
    },
    {
        id: 'descripcion',
        label: "DESCRIPCION"
    },
];
export const ProductosColumns = [
    {
        id: 'id',
        label: "ID"
    },
    {
        id: 'producto',
        label: "PRODUCTO"
    },
    {
        id: 'montoInicial',
        label: "COSTO"
    },
    {
        id: 'categoria',
        label: "CATEGORIA"
    }
];

export const TallerColumns = [
    {
        id: 'id',
        label: "ID"
    },
    {
        id: 'nombre',
        label: "NOMBRE"
    },
    {
        id: 'direccion',
        label: "DIRECCION"
    },
    {
        id: 'telefono',
        label: "TELEFONO"
    },
    {
        id: 'rnc',
        label: "RNC"
    },
    {
        id: 'correo',
        label: "CORREO"
    }
];

export const TipoUsuariosColumns = [
    {
        id: 'id',
        label: "ID"
    },
    {
        id: 'tipo',
        label: "ROL"
    },
    {
        id: 'descripcion',
        label: "DESCRIPCION"
    }
];

export const UsuariosColumns = [
    {
        id: 'id',
        label: "ID"
    },
    {
        id: 'usuario',
        label: "USUARIO"
    },
    {
        id: 'rol',
        label: "ROL"
    }
];

export const ReparacionColumns = [
    {
        id: 'id',
        label: "ID"
    },
    {
        id: 'cliente',
        label: "CLIENTE"
    },
    {
        id: 'apellido',
        label: "APELLIDO"
    },
    {
        id: 'marca',
        label: "MARCA"
    },
    {
        id: 'modelo',
        label: "MODELO"
    },
    {
        id: 'matricula',
        label: "MATRICULA"
    },
    {
        id: 'estado',
        label: "ESTADO"
    },
    {
        id: 'fechaEntrada',
        label: "FECHA ENTRADA"
    }, ,
    {
        id: 'comentario',
        label: "COMENTARIO"
    }
];
export const MecanicoReparacionColumns = [
    {
        id: 'id',
        label: "ID"
    },
    {
        id: 'mecanico',
        label: "MECANICO"
    },
    {
        id: 'cliente',
        label: "CLIENTE"
    },
    {
        id: 'color',
        label: "COLOR VEHICULO"
    },
    {
        id: 'matricula',
        label: "MATRICULA"
    },
    {
        id: 'marca',
        label: "MARCA"
    },
    {
        id: 'modelo',
        label: "MODELO"
    }
    
];

export const DetalleReparacionColumns = [
    {
        id: 'id',
        label: "ID"
    },
    {
        id: 'producto',
        label: "PRODUCTO"
    },
    {
        id: 'cantidad',
        label: "CANTIDAD"
    },
    {
        id: 'subTotal',
        label: "SUBTOTAL"
    }
];

export const FacturasColumns = [
    
    {
        id: 'id',
        label: "ID"
    },
  
    {
        id: 'cliente',
        label: "CLIENTE"
    },
    {
        id: 'apellido',
        label: "APELLIDO"
    },
    {
        id: 'marca',
        label: "MARCA"
    },
    {
        id: 'modelo',
        label: "MODELO"
    },
    {
        id: 'color',
        label: "COLOR VEH."
    },
    {
        id: 'matricula',
        label: "MATRICULA"
    },
    {
        id: 'itbis',
        label: "ITBIS"
    },
    {
        id: 'total',
        label: "TOTAL"
    },
    {
        id: 'numero',
        label: "No."
    }
]