import React, { useEffect, useState } from 'react'
import TablaPaginacion from '../TablaPaginacion'
import { GetMecanicoReparacion } from '../provider/MecanicoReparacionApi'
import { MecanicoReparacionColumns } from '../provider/common/Columns'


export const MecanicoReparacion = () => {
    const [dataMecanicoReparacion,setMecanicoReparacion] = useState([])
    useEffect(()=>{
        GetMecanicoReparacion(setMecanicoReparacion);
    },[])
   
  return (
    <div className='container page'>
        <h1 className='mb-3 mt-3'>Asignaciones de mecanicos</h1>
        <button className='btn btn-primary'>Asignar</button>
        <TablaPaginacion
        columns={MecanicoReparacionColumns}
        data={dataMecanicoReparacion}
        />
    
    
    </div>
  )
}
