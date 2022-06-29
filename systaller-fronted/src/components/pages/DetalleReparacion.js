import React, { useEffect, useState } from 'react'
import TablaPaginacion from '../TablaPaginacion'
import { DetalleReparacionColumns } from '../provider/common/Columns'
import { useParams } from 'react-router-dom'
import { GetDataID,GetData,PostData,PutData,DeleteData } from '../provider/Api'
import {PostTerminarReparacion} from '../provider/DetalleReparacionApi'
import { ModalDetalleProductos } from '../provider/form/ModalDetalleProductos'
import Alert from '../provider/common/Alert'
import { handleFormDetalleProductos } from '../provider/common/Handle'
export const DetalleReparacion = ({ disable }) => {
  const [dataDetalleReparacion, setDetalleReparacion] = useState([])
  const { id } = useParams();
  useEffect(() => {
    GetDataID(setDetalleReparacion, 'detalleReparacion', id);
  }, [id])
  const [dataProductos,setProductos] = useState([])
  useEffect(()=>{
      GetData(setProductos,'producto');
  },[])

  const [abrirM, setAbrirModal] = useState(false);
  const [accion, setAccion] = useState('');
  const [method, setMethod] = useState({ add: false, edit: false });
  const [detalleProductos, setDetalleProductos] = useState({
    id: '',
    productoID: '',
    cantidad: '',
    reparacionID:id,
    precio:''
   
  })
  const cleanForm = {
    id: '',
    productoID: '',
    cantidad: '',
    reparacionID:id,
    precio:''
   
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
      setDetalleProductos(cleanForm);
    }
  }
  const handResult = (data) => {

    if (data.data.estado) {
      if (method.add) {
        setDetalleReparacion(dataDetalleReparacion.concat(data.data.data))
      } else if (method.edit) {
        let index = 0;
        dataDetalleReparacion.map((detalle, i) =>
          (detalle.id === data.data.data.id) ?
            index = i : null
        )
        let newdata = dataDetalleReparacion;
        newdata[index] = data.data.data;
        setDetalleReparacion(newdata);
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
    setDetalleProductos((datosPrevios) => ({
      ...datosPrevios,
      [name]: value
    }))

  }
  const handleEdit = (producto) => {
    setMethod({ add: false, edit: true });
    abrirModal('Editar');
    setDetalleProductos(producto);
  }
  const accionForm = () => {
    if (method.add) {
      PostData(handResult, handleFormDetalleProductos(detalleProductos), 'detalleReparacion');
    } else {

      PutData(detalleProductos.id, handleFormDetalleProductos(detalleProductos), handResult, 'detalleReparacion');

    }
  }
  const eliminar = (id) => {
    if (window.confirm("Estas seguro que deseas eliminar este registro?")) {
      const newData = dataProductos.filter(producto =>
        producto.id !== id
      )
      DeleteData(id, handResult, 'detalleReparacion');
      setProductos(newData);
    }
  }
  return (
    <div className='container page'>
      <h1 className='mb-3 mt-3'>Detalle Reparacion</h1>
      <Alert
        msjAlert={msjAlert}
        setMsjAlert={setMsjAlert}
      />
      <button onClick={() => abrirModal("Agregar")} className="btn btn-primary m-3">Agregar</button>
      <button
        className='btn btn-info ms-3'
        onClick={() => PostTerminarReparacion(id, setDetalleReparacion, dataDetalleReparacion)}
      >Terminar Reparacion
      </button>
      <TablaPaginacion
        columns={DetalleReparacionColumns}
        data={dataDetalleReparacion}
        disable={disable}
      />
      <ModalDetalleProductos
        handleChange={handleChange}
        productoDatos={dataProductos}
        abrirModal={abrirModal}
        accionForm={accionForm}
        abrirM={abrirM}
        accion={accion}
      />

    </div>
  )
}
