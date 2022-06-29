import React, { useEffect, useState } from 'react'
import TablaPaginacion from '../TablaPaginacion'
import { GetFacturas } from '../provider/FacturasApi'
import { DeleteData } from '../provider/Api'
import { FacturasColumns } from '../provider/common/Columns'
import { Outlet } from 'react-router-dom'
import Alert from '../provider/common/Alert'

export const Facturas = () => {
    const [dataFacturas,setFacturas] = useState([])
    useEffect(()=>{
        GetFacturas(setFacturas);
    },[])
    const [abrirM, setAbrirModal] = useState(false);
    const [accion, setAccion] = useState('');
    const [method, setMethod] = useState({ add: false, edit: false });
    const [productoDatos, setProductoDatos] = useState({
      id: '',
      producto: '',
      montoInicial: '',
      categoriaID: '',
     
    })
    const cleanForm = {
      id: '',
      producto: '',
      montoInicial: '',
      categoriaID: '',
     
    }
    const [msjAlert, setMsjAlert] = useState({ status: false, msj: [], variant: null, header: null });
    let objAlert = {};
  
    const abrirModal = (accion) => {
      if (accion === "Agregar") {
        setMethod({ add: true, edit: false });
      }
      setAbrirModal(!abrirM);
      setAccion(accion);
      if (!abrirM) {
      //  setProductoDatos(cleanForm);
      }
    }

    const handResult = (data) => {
  
      if (data.data.estado) {
        if (method.add) {
          setFacturas(dataFacturas.concat(data.data.data))
        } else if (method.edit) {
          let index = 0;
          dataFacturas.map((factura, i) =>
            (factura.id === data.data.data.id) ?
              index = i : null
          )
          let newdata = dataFacturas;
          newdata[index] = data.data.data;
          setFacturas(newdata);
        }
        objAlert = { status: true, msj: [], variant: 'success', header: 'Exito' }
        objAlert.msj.push(data.data.Mensaje)
        setMsjAlert(objAlert);
        setAbrirModal(false)
        setTimeout(() => {
          setMsjAlert({ status: false, msj: [] })
        }
          , 5000)
      } else {
  
        objAlert = { status: true, msj: [], variant: 'warning', header: 'Advertencia' }
        data.data.forEach(element => {
          objAlert.msj.push(element);
        });
        setMsjAlert(objAlert)
        setTimeout(() => {
          setMsjAlert({ status: false, msj: [] })
        }
          , 5000)
      }
      setMethod({ add: false, edit: false });
  
    }
    const eliminar = (id) => {
      if (window.confirm("Estas seguro que deseas eliminar este registro?")) {
        const newData = dataFacturas.filter(factura =>
          factura.id !== id
        )
        DeleteData(id, handResult, 'facturacion');
        setFacturas(newData);
      }
    }
  return (
    <div className='container page'>
        <h1 className='mb-3 mt-3'>Facturas</h1>
        <Alert
        msjAlert={msjAlert}
        setMsjAlert={setMsjAlert}
      />
        <TablaPaginacion
        columns={FacturasColumns}
        data={dataFacturas}
        facturacion = {true}
        eliminar={eliminar}
        />
    
    <Outlet/>
    </div>
  )
}
