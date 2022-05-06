import React, { useEffect, useState } from 'react'
import TablaPaginacion from '../TablaPaginacion'
import { GetProductos } from '../provider/ProductosApi'
import { ProductosColumns } from '../provider/common/Columns'


export const Productos = () => {
    const [dataProductos,setProductos] = useState([])
    useEffect(()=>{
        GetProductos(setProductos);
    },[])
   
  return (
    <div className='container page'>
        <h1 className='mb-3 mt-3'>Productos y servicios</h1>
        <button className='btn btn-primary'>Agregar</button>
        <TablaPaginacion
        columns={ProductosColumns}
        data={dataProductos}
        />
    
    
    </div>
  )
}
