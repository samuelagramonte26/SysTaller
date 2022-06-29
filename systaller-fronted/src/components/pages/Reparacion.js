import React, { useEffect, useState } from 'react'
import TablaPaginacion from '../TablaPaginacion'
import { ReparacionColumns } from '../provider/common/Columns'
import { Outlet, useNavigate } from 'react-router-dom'
import { GetData, PostData, PutData, DeleteData } from '../provider/Api'
import { handleFormMecanicoReparacion, handleFormReparacion } from '../provider/common/Handle'
import Alert from '../provider/common/Alert'
import { ModalReparacion } from '../provider/form/ModalReparacion'
import { ModalMecanicoReparacion } from '../provider/form/ModalMecanicoReparacion'


export const Reparacion = () => {
  const [dataReparacion, setReparacion] = useState([])
  const [idReparacion, setIdReparacion] = useState(0);
  const [dataMecanicos, setDataMecanicos] = useState([]);
  const [asignacionDatos, setAsignacionDatos] = useState({
    reparacionID: idReparacion,
    mecanicoID: ''
  })
  //const navigate =  useNavigate()
   const [dataReparacionTerminada,setReparacionTerminada] = useState([]);
  useEffect(() => {
    GetData(setReparacion, 'reparacion');
    GetData(setDataMecanicos, 'reparacionMecanicos');
     GetData(setReparacionTerminada,'reparacionTerminadas');

  }, [])


  const [abrirM, setAbrirModal] = useState(false);
  const [abrirMM, setAbrirModalM] = useState(false);
  const [accion, setAccion] = useState('');
  const [method, setMethod] = useState({ add: false, edit: false });
  const [reparacionDatos, setReparacionDatos] = useState({
    id: '',
    clienteID: '',
    vehiculoID: '',
    comentario: '',
    fechaEntrada: '',

  })
  const cleanForm = {
    id: '',
    clienteID: '',
    vehiculoID: '',
    comentario: '',
    fechaEntrada: '',

  }
  const cleanFormM = {
    mecanicoID: ''
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
      setReparacionDatos(cleanForm);
    }
  }
  const abrirModalM = () => {

    setAbrirModalM(!abrirMM);
    if (!abrirMM) {
      setAsignacionDatos(cleanFormM);
    }
  }
  const handResult = (data) => {
    if (data.data.estado) {
      if (method.add) {
        setReparacion(dataReparacion.concat(data.data.data))
      } else if (method.edit) {
        let index = 0;
        dataReparacion.map((reparacion, i) =>
          (reparacion.id === data.data.data.id) ?
            index = i : null
        )
        let newdata = dataReparacion;
        newdata[index] = data.data.data;
        setReparacion(newdata);
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
    setReparacionDatos((datosPrevios) => ({
      ...datosPrevios,
      [name]: value
    }))
  }
  const handleChangeM = e => {
    const { name, value } = e.target;
    setAsignacionDatos((datosPrevios) => ({
      ...datosPrevios,
      [name]: value
    }))
    console.log(asignacionDatos)
  }
  const handleEdit = (reparacion) => {
    setMethod({ add: false, edit: true });
    abrirModal('Editar');
    setReparacionDatos(reparacion);
  }
  const accionForm = () => {
    if (method.add) {
      PostData(handResult, handleFormReparacion(reparacionDatos), 'reparacion');
    } else {

      PutData(reparacionDatos.id, handleFormReparacion(reparacionDatos), handResult, 'reparacion');

    }
  }
  const handResultM = ({data}) =>{
    const filtrarDatos = dataReparacion.filter(data => data.id !== data.reparacionID);
    setReparacionDatos(filtrarDatos);
    objAlert = { status: true, msj: [], variant: 'success', header: 'Exito' }
    objAlert.msj.push(data.Mensaje)
    setMsjAlert(objAlert);
    setAbrirModal(false)
    setTimeout(() => {
      setMsjAlert({ status: false, msj: [] })
    }
      , 5000)
    if(data.estado){

    } else {

      objAlert = { status: true, msj: [], variant: 'warning', header: 'Advertencia' }
      data.forEach(element => {
        objAlert.msj.push(element);
      });
      setMsjAlert(objAlert)
      setTimeout(() => {
        setMsjAlert({ status: false, msj: [] })
      }
        , 5000)
    }
  }
  const accionFormM = () => {

    PostData(handResultM, handleFormMecanicoReparacion(asignacionDatos), 'mecanicoReparacion');

  }
  const eliminar = (id) => {
    if (window.confirm("Estas seguro que deseas eliminar este registro?")) {
      const newData = dataReparacion.filter(reparacion =>
        reparacion.id !== id
      )
      DeleteData(id, handResult, 'reparacion');
      setReparacion(newData);
    }
  }
  const asignacion = (id) => {
    
    setAbrirModalM(true);
    asignacionDatos.reparacionID = id;
  }
  return (
    <div className='container page'>
      <h1 className='mb-3 mt-3'>Reparaciones</h1>
      <Alert
        msjAlert={msjAlert}
        setMsjAlert={setMsjAlert}
      />
      <button onClick={() => abrirModal("Agregar")} className="btn btn-primary m-3">Agregar</button>
      <TablaPaginacion
        columns={ReparacionColumns}
        data={dataReparacion}
        asignar={asignacion}
        reparacion={true}
        eliminar={eliminar}
        handleEdit={handleEdit}
      />
      <ModalReparacion
        handleChange={handleChange}
        reparacionDatos={reparacionDatos}
        abrirModal={abrirModal}
        accionForm={accionForm}
        abrirM={abrirM}
        accion={accion}
      
      />
      <ModalMecanicoReparacion
        handleChange={handleChangeM}
        dataMecanicos={dataMecanicos}
        abrirModal={abrirModalM}
        accionForm={accionFormM}
        abrirM={abrirMM}
        accion={"Agregar"}
      />




     
        <h1 className='mb-3 mt-3'>Reparaciones terminadas</h1>

       <TablaPaginacion
        columns={ReparacionColumns}
        data={dataReparacionTerminada}
        reparacion={true}
        facturar={true}
       
        />
  
      <Outlet />
    </div>
  )
}
