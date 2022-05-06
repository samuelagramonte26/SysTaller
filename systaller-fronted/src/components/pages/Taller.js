import React, { useEffect, useState } from 'react'
import TablaPaginacion from '../TablaPaginacion'
import { GetTaller } from '../provider/TallerApi'
import { TallerColumns } from '../provider/common/Columns'


export const Taller = () => {
    const [dataTaller,setTaller] = useState([])
    useEffect(()=>{
        GetTaller(setTaller);
    },[])
   
  return (
    <div className='container page'>
        <h1 className='mb-3 mt-3'>Taller</h1>
        <button className='btn btn-primary'>Agregar</button>
        <TablaPaginacion
        columns={TallerColumns}
        data={dataTaller}
        />
    
    
    </div>
  )
}
