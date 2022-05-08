import React, { useEffect, useState } from 'react'
import TablaPaginacion from '../TablaPaginacion'
import { ProductosColumns } from '../provider/common/Columns'
import { GetData,PostData,PutData,DeleteData } from '../provider/Api'
import { handleFormProducto } from '../provider/common/Handle'
import Alert from "../provider/common/Alert"
import { ModalProductos } from '../provider/form/ModalProductos' 

export const Productos = () => {
    const [dataProductos,setProductos] = useState([])
    useEffect(()=>{
        GetData(setProductos,'producto');
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
        setProductoDatos(cleanForm);
      }
    }
    const handResult = (data) => {
  
      if (data.data.estado) {
        if (method.add) {
          setProductos(dataProductos.concat(data.data.data))
        } else if (method.edit) {
          let index = 0;
          dataProductos.map((producto, i) =>
            (producto.id === data.data.data.id) ?
              index = i : null
          )
          let newdata = dataProductos;
          newdata[index] = data.data.data;
          setProductos(newdata);
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
    const handleChange = e => {
      const { name, value } = e.target;
      setProductoDatos((datosPrevios) => ({
        ...datosPrevios,
        [name]: value
      }))
  
    }
    const handleEdit = (producto) => {
      setMethod({ add: false, edit: true });
      abrirModal('Editar');
      setProductoDatos(producto);
    }
    const accionForm = () => {
      if (method.add) {
        PostData(handResult, handleFormProducto(productoDatos), 'producto');
      } else {
  
        PutData(productoDatos.id, handleFormProducto(productoDatos), handResult, 'producto');
  
      }
    }
    const eliminar = (id) => {
      if (window.confirm("Estas seguro que deseas eliminar este registro?")) {
        const newData = dataProductos.filter(producto =>
          producto.id !== id
        )
        DeleteData(id, handResult, 'producto');
        setProductos(newData);
      }
    }
   
  return (
    <div className='container page'>
        <h1 className='mb-3 mt-3'>Productos y servicios</h1>
        <Alert
        msjAlert={msjAlert}
        setMsjAlert={setMsjAlert}
      />
      <button onClick={() => abrirModal("Agregar")} className="btn btn-primary m-3">Agregar</button>

        <TablaPaginacion
        columns={ProductosColumns}
        data={dataProductos}
        eliminar={eliminar}
        handleEdit={handleEdit}
        />
    
    <ModalProductos
        handleChange={handleChange}
        productoDatos={productoDatos}
        abrirModal={abrirModal}
        accionForm={accionForm}
        abrirM={abrirM}
        accion={accion}
      />
    </div>
  )
}
