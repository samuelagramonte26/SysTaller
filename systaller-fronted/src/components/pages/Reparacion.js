import React, { useEffect, useState } from 'react'
import TablaPaginacion from '../TablaPaginacion'
import { GetReparacion, GetReparacionTerminada } from '../provider/ReparacionApi'
import { ReparacionColumns } from '../provider/common/Columns'
import { Outlet } from 'react-router-dom'



export const Reparacion = () => {
    const [dataReparacion,setReparacion] = useState([])
    const [dataReparacionTerminada,setReparacionTerminada] = useState([]);
    useEffect(()=>{
        GetReparacion(setReparacion);
      GetReparacionTerminada(setReparacionTerminada);

    },[])
    console.log(dataReparacionTerminada)
  return (
    <div className='container page'>
        <h1 className='mb-3 mt-3'>Reparaciones</h1>
        <button className='btn btn-primary'>Agregar</button>
        <TablaPaginacion
        columns={ReparacionColumns}
        data={dataReparacion}
        reparacion={true}
        />
        <h1 className='mb-3 mt-3'>Reparaciones terminadas</h1>

         <TablaPaginacion
        columns={ReparacionColumns}
        data={dataReparacionTerminada}
        reparacion={true}
        facturar={true}
       
        />
    
    <Outlet/>
    </div>
  )
}
