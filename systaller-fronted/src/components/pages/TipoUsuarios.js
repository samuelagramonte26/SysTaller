import React, { useEffect, useState } from 'react'
import TablaPaginacion from '../TablaPaginacion'
import { GetTipoUsuarios } from '../provider/TipoUsuariosApi'
import { TipoUsuariosColumns } from '../provider/common/Columns'


export const TipoUsuarios = () => {
    const [dataTipoUsuarios,setTipoUsuarios] = useState([])
    useEffect(()=>{
        GetTipoUsuarios(setTipoUsuarios);
    },[])
   
  return (
    <div className='container page'>
        <h1 className='mb-3 mt-3'>Tipo Usuarios</h1>
        <button className='btn btn-primary'>Agregar</button>
        <TablaPaginacion
        columns={TipoUsuariosColumns}
        data={dataTipoUsuarios}
        />
    </div>
  )
}
