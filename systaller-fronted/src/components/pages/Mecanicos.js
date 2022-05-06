import React, { useEffect, useState } from 'react'
import TablaPaginacion from '../TablaPaginacion'
import { GetMecanicos } from '../provider/MecanicosApi'
import { MecanicosColumns } from '../provider/common/Columns'


export const Mecanicos = () => {
    const [dataMecanicos,setMecanicos] = useState([])
    useEffect(()=>{
        GetMecanicos(setMecanicos);
    },[])
   
  return (
    <div className='container page'>
        <h1 className='mb-3 mt-3'>Mecanicos</h1>
        <button className='btn btn-primary'>Agregar</button>
        <TablaPaginacion
        columns={MecanicosColumns}
        data={dataMecanicos}
        />
    
    
    </div>
  )
}
