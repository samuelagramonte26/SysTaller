import React, { useEffect, useState } from 'react'
import TablaPaginacion from '../TablaPaginacion'
import { TallerColumns } from '../provider/common/Columns'
import { GetData,PostData,PutData,DeleteData } from '../provider/Api'
import Alert from '../provider/common/Alert'
import { handleFormTaller } from '../provider/common/Handle'
import { ModalTaller } from '../provider/form/ModalTaller'
export const Taller = () => {
    const [dataTaller,setTaller] = useState([])
    useEffect(()=>{
        GetData(setTaller,'taller');
    },[])
   
    const [abrirM, setAbrirModal] = useState(false);
    const [accion, setAccion] = useState('');
    const [method, setMethod] = useState({ add: false, edit: false });
    const [tallerDatos, setTallerDatos] = useState({
      id: '',
      nombre: '',
      rnc: '',
      correo: '',
      direccion: '',
      telefono:''
    })
    const cleanForm = {
      id: '',
      nombre: '',
      rnc: '',
      correo: '',
      direccion: '',
      telefono:''
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
        setTallerDatos(cleanForm);
      }
    }
    const handResult = (data) => {    
      if (data.data.estado) {
        if (method.add) {
          setTaller(dataTaller.concat(data.data.data))
        } else if (method.edit) {
          let index = 0;
          dataTaller.map((taller, i) =>
            (taller.id === data.data.data.id) ?
              index = i : null
          )
          let newdata = dataTaller;
          newdata[index] = data.data.data;
          setTaller(newdata);
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
      setTallerDatos((datosPrevios) => ({
        ...datosPrevios,
        [name]: value
      }))
    }
    const handleEdit = (taller) => {
      setMethod({ add: false, edit: true });
      abrirModal('Editar');
      setTallerDatos(taller);
    }
    const accionForm = () => {
      if (method.add) {
        PostData(handResult,handleFormTaller(tallerDatos),'taller');
      } else {
        console.log(tallerDatos);
        PutData(tallerDatos.id,handleFormTaller(tallerDatos),handResult,'taller');
      
      }
    }
    const eliminar = (id) => {
      if (window.confirm("Estas seguro que deseas eliminar este registro?")) {
        const newData = dataTaller.filter(taller =>
          taller.id !== id
        )
        DeleteData(id,handResult,'taller');
        setTaller(newData);
      }
    }
  return (
    <div className='container page'>
        <h1 className='mb-3 mt-3'>Taller</h1>
        <Alert
        msjAlert={msjAlert}
        setMsjAlert={setMsjAlert}
      />
        <button onClick={() => abrirModal("Agregar")} className="btn btn-primary m-3">Agregar</button>

        <TablaPaginacion
        columns={TallerColumns}
        data={dataTaller}
        eliminar={eliminar}
        handleEdit={handleEdit}
        />
    
    <ModalTaller
     handleChange={handleChange}
     tallerDatos={tallerDatos}
     abrirModal={abrirModal}
     accionForm={accionForm}
     abrirM={abrirM}
     accion={accion}
    />
    </div>
  )
}
