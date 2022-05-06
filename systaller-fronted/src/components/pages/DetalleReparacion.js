import React, { useEffect, useState } from 'react'
import TablaPaginacion from '../TablaPaginacion'
import { GetDetalleReparacion,PostTerminarReparacion } from '../provider/DetalleReparacionApi'
import { DetalleReparacionColumns } from '../provider/common/Columns'
import { useParams } from 'react-router-dom'


export const DetalleReparacion = ({ disable }) => {
  const [dataDetalleReparacion, setDetalleReparacion] = useState([])
  const { id } = useParams();
  useEffect(() => {
    GetDetalleReparacion(setDetalleReparacion, id);
  }, [id])
  
  return (
    <div className='container page'>
      <h1 className='mb-3 mt-3'>Detalle Reparacion</h1>
   
        <button className='btn btn-primary'>Agregar producto</button>
        <button 
        className='btn btn-info ms-3' 
        onClick={()=>PostTerminarReparacion(id,setDetalleReparacion,dataDetalleReparacion)}
        >Terminar Reparacion
        </button>       
 
      <TablaPaginacion
        columns={DetalleReparacionColumns}
        data={dataDetalleReparacion}
        disable={disable }
      />


    </div>
  )
}
