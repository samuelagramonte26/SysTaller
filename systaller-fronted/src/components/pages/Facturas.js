import React, { useEffect, useState } from 'react'
import TablaPaginacion from '../TablaPaginacion'
import { GetFacturas } from '../provider/FacturasApi'
import { FacturasColumns } from '../provider/common/Columns'
import { Outlet } from 'react-router-dom'


export const Facturas = () => {
    const [dataFacturas,setFacturas] = useState([])
    useEffect(()=>{
        GetFacturas(setFacturas);
    },[])
   
  return (
    <div className='container page'>
        <h1 className='mb-3 mt-3'>Facturas</h1>
        <button className='btn btn-primary'>Agregar</button>
        <TablaPaginacion
        columns={FacturasColumns}
        data={dataFacturas}
        facturacion = {true}
        />
    
    <Outlet/>
    </div>
  )
}
