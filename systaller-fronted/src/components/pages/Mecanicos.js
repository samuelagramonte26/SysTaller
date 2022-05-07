import React, { useEffect, useState } from 'react'
import TablaPaginacion from '../TablaPaginacion'
import { MecanicosColumns } from '../provider/common/Columns'
import { ModalMecanico } from '../provider/form/ModalMecanicos'
import { handleFormMecanico } from '../provider/common/Handle'
import { GetData,PostData,PutData,DeleteData } from '../provider/Api'
import  Alert  from '../provider/common/Alert'


export const Mecanicos = () => {
  const [dataMecanicos, setMecanicos] = useState([])
  useEffect(() => {
    GetData(setMecanicos, 'mecanicos');
  }, [])

  const [abrirM, setAbrirModal] = useState(false);
  const [accion, setAccion] = useState('');
  const [method, setMethod] = useState({ add: false, edit: false });
  const [mecanicoDatos, setMecanicoDatos] = useState({
    id: '',
    nombre: '',
    apellido: '',
    cedula: '',
    fechaNacimiento: '',

  })
  const cleanForm = {
    id: '',
    nombre: '',
    apellido: '',
    cedula: '',
    fechaNacimiento: '',

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
      setMecanicoDatos(cleanForm);
    }
  }
  const handResult = (data) => {

    if (data.data.estado) {
      if (method.add) {
        setMecanicos(dataMecanicos.concat(data.data.data))
      } else if (method.edit) {
        let index = 0;
        dataMecanicos.map((cliente, i) =>
          (cliente.id === data.data.data.id) ?
            index = i : null
        )
        let newdata = dataMecanicos;
        newdata[index] = data.data.data;
        setMecanicos(newdata);
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
    setMecanicoDatos((datosPrevios) => ({
      ...datosPrevios,
      [name]: value
    }))
  }
  const handleEdit = (Mecanico) => {
    setMethod({ add: false, edit: true });
    abrirModal('Editar');
    setMecanicoDatos(Mecanico);
  }
  const accionForm = () => {
    if (method.add) {
      PostData(handResult, handleFormMecanico(mecanicoDatos), 'mecanicos');
    } else {
     
      PutData(mecanicoDatos.id, handleFormMecanico(mecanicoDatos), handResult, 'mecanicos');

    }
  }
  const eliminar = (id) => {
    if (window.confirm("Estas seguro que deseas eliminar este registro?")) {
      const newData = dataMecanicos.filter(Mecanico =>
        Mecanico.id !== id
      )
      DeleteData(id, handResult, 'mecanicos');
      setMecanicos(newData);
    }
  }

  return (
    <div className='container page'>
      <h1 className='mb-3 mt-3'>Mecanicos</h1>
      <Alert
        msjAlert={msjAlert}
        setMsjAlert={setMsjAlert}
      />
      <button onClick={() => abrirModal("Agregar")} className="btn btn-primary m-3">Agregar</button>

      <TablaPaginacion
        columns={MecanicosColumns}
        data={dataMecanicos}
        eliminar={eliminar}
        handleEdit={handleEdit}
      />
      <ModalMecanico
        handleChange={handleChange}
        mecanicoDatos={mecanicoDatos}
        abrirModal={abrirModal}
        accionForm={accionForm}
        abrirM={abrirM}
        accion={accion}
      />

    </div>
  )
}
