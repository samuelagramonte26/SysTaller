import React, { useEffect, useState } from 'react'
import TablaPaginacion from '../TablaPaginacion'
import { GetCategoriasProductos } from '../provider/CategoriasProductosApi'
import { CategoriasProductosColumns } from '../provider/common/Columns'


export const CategoriasPorductos = () => {
    const [dataCategoriasProductos,setCategoriasProductos] = useState([])
    useEffect(()=>{
        GetCategoriasProductos(setCategoriasProductos);
    },[])
   
  return (
    <div className='container page'>
        <h1 className='mb-3 mt-3'>Categoria productos y servicios</h1>
        <button className='btn btn-primary'>Agregar</button>
        <TablaPaginacion
        columns={CategoriasProductosColumns}
        data={dataCategoriasProductos}
        />
    
    
    </div>
  )
}
