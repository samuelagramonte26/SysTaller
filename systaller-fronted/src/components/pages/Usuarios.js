import React, { useEffect, useState } from 'react'
import TablaPaginacion from '../TablaPaginacion'
import { GetUsuarios } from '../provider/UsuariosApi'
import { UsuariosColumns } from '../provider/common/Columns'


export const Usuarios = () => {
    const [dataUsuarios,setUsuarios] = useState([])
    useEffect(()=>{
        GetUsuarios(setUsuarios);
    },[])
   
  return (
    <div className='container page'>
        <h1 className='mb-3 mt-3'>Usuarios</h1>
        <button className='btn btn-primary'>Agregar</button>
        <TablaPaginacion
        columns={UsuariosColumns}
        data={dataUsuarios}
        />
    </div>
  )
}
