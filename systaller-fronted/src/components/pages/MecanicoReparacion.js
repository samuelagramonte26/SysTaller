import React, { useEffect, useState } from 'react'
import TablaPaginacion from '../TablaPaginacion'
import { MecanicoReparacionColumns } from '../provider/common/Columns'
import { GetData, DeleteData, PutData } from '../provider/Api'
import { ModalMecanicoReparacion } from '../provider/form/ModalMecanicoReparacion'
import { handleFormMecanicoReparacion } from '../provider/common/Handle'


export const MecanicoReparacion = () => {
  const [dataMecanicoReparacion, setDataMecanicoReparacion] = useState([])
  //const [dataMecanicos,setDataMecanicos] = useState([]);
  const [dataMecanicos, setDataMecanicos] = useState([]);

  useEffect(() => {
    GetData(setDataMecanicoReparacion, 'mecanicoReparacion');
    GetData(setDataMecanicos, 'reparacionMecanicos');
  }, [])


  const [abrirM, setAbrirModal] = useState(false);
  const [accion, setAccion] = useState('');
  const [method, setMethod] = useState({ add: false, edit: false });
  const [reparacionDatos, setReparacionDatos] = useState({
    id: '',
    mecanicoID: '',
    reparacionID: ''
  })
  const cleanForm = {
    id: '',
    mecanicoID: '',
    reparacionID: ''
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

  const handResult = (data) => {

    if (data.data.estado) {
      if (method.add) {
        setDataMecanicoReparacion(dataMecanicoReparacion.concat(data.data.data))
      } else if (method.edit) {
        let index = 0;
        dataMecanicoReparacion.map((reparacion, i) =>
          (reparacion.id === data.data.data.id) ?
            index = i : null
        )
        let newdata = dataMecanicoReparacion;
        newdata[index] = data.data.data;
        setDataMecanicoReparacion(newdata);
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
  const handleEdit = (reparacion) => {
    setMethod({ add: false, edit: true });
    abrirModal('Editar');
    //setReparacionDatos();
  }
  const accionForm = () => {
    if (method.add) {
     // PostData(handResult, handleFormReparacion(reparacionDatos), 'reparacion');
    } else {
console.log(reparacionDatos)
      PutData(reparacionDatos.id, handleFormMecanicoReparacion(reparacionDatos), handResult, 'mecanicoReparacion');

    }
  }

  const eliminar = (id) => {
    if (window.confirm("Estas seguro que deseas eliminar este registro?")) {
      const newData = dataMecanicoReparacion.filter(reparacion =>
        reparacion.id !== id
      )
      DeleteData(id, handResult, 'mecanicoReparacion');
      setDataMecanicoReparacion(newData);
    }
  }
  return (
    <div className='container page'>
      <h1 className='mb-3 mt-3'>Asignaciones de mecanicos</h1>

      <TablaPaginacion
        columns={MecanicoReparacionColumns}
        data={dataMecanicoReparacion}
        eliminar={eliminar}
        handleEdit={handleEdit}
      />

      <ModalMecanicoReparacion
        handleChange={handleChange}
        dataMecanicos={dataMecanicos}
        abrirModal={abrirModal}
        accionForm={accionForm}
        abrirM={abrirM}
        accion={"Editar"}
      />

      {/*
        <TablaPaginacion
        columns={MecanicoReparacionColumns}
        data={dataMecanicoReparacion}
        />
      */}

    </div>
  )
}
