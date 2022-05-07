import React, { useEffect, useState } from 'react'
import TablaPaginacion from '../TablaPaginacion'
import { PostData, PutData, DeleteData, GetData } from '../provider/Api'
import { ClientesColumns } from '../provider/common/Columns'
import { ModalCliente } from '../provider/form/ModalCliente'
import Alert from '../provider/common/Alert'
import { handleFormCliente } from '../provider/common/Handle'
import { convertLength } from '@mui/material/styles/cssUtils'


export const Clientes = () => {
  const [dataClientes, setClientes] = useState([])
  useEffect(() => {
    GetData(setClientes, 'cliente');
  }, [])

  const [abrirM, setAbrirModal] = useState(false);
  const [accion, setAccion] = useState('');
  const [method, setMethod] = useState({ add: false, edit: false });
  const [clienteDatos, setClienteDatos] = useState({
    id: '',
    nombre: '',
    apellido: '',
    cedula: '',
    direccion: '',
    telefono: ''
  })
  const cleanForm = {
    id: '',
    nombre: '',
    apellido: '',
    cedula: '',
    direccion: '',
    telefono: ''
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
      setClienteDatos(cleanForm);
    }
  }
  const handResult = (data) => {
    if (data.data.estado) {
      if (method.add) {
        setClientes(dataClientes.concat(data.data.data))
      } else if (method.edit) {
        let index = 0;
        dataClientes.map((cliente, i) =>
          (cliente.id === data.data.data.id) ?
            index = i : null
        )
        let newdata = dataClientes;
        newdata[index] = data.data.data;
        setClientes(newdata);
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
    setClienteDatos((datosPrevios) => ({
      ...datosPrevios,
      [name]: value
    }))
  }
  const handleEdit = (cliente) => {
    setMethod({ add: false, edit: true });
    abrirModal('Editar');
    setClienteDatos(cliente);
  }
  const accionForm = () => {
    if (method.add) {
      PostData(handResult, handleFormCliente(clienteDatos), 'cliente');
    } else {

      PutData(clienteDatos.id, handleFormCliente(clienteDatos), handResult, 'cliente');

    }
  }
  const eliminar = (id) => {
    if (window.confirm("Estas seguro que deseas eliminar este registro?")) {
      const newData = dataClientes.filter(cliente =>
        cliente.id !== id
      )
      DeleteData(id, handResult, 'cliente');
      setClientes(newData);
    }
  }

  return (
    <div className='container page'>

      <h1 className='mb-3 mt-3'>Clientes</h1>
      <Alert
        msjAlert={msjAlert}
        setMsjAlert={setMsjAlert}
      />
      <button onClick={() => abrirModal("Agregar")} className="btn btn-primary m-3">Agregar</button>

      <TablaPaginacion
        columns={ClientesColumns}
        data={dataClientes}
        eliminar={eliminar}
        handleEdit={handleEdit}
      />
      <ModalCliente
        handleChange={handleChange}
        clienteDatos={clienteDatos}
        abrirModal={abrirModal}
        accionForm={accionForm}
        abrirM={abrirM}
        accion={accion}
      />

    </div>
  )
}
