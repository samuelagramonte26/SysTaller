import React, { useEffect, useState } from 'react'
import TablaPaginacion from '../TablaPaginacion'
import { GetData, PostData, PutData, DeleteData } from '../provider/Api'
import { VehiculosColumns } from '../provider/common/Columns'
import Alert from '../provider/common/Alert'
import { ModalVehiculo } from '../provider/form/ModalVehiculo'
import { handleFormVehiculo } from '../provider/common/Handle'

export const Vehiculos = () => {
  const [dataVehiculos, setVehiculos] = useState([])
  useEffect(() => {
    GetData(setVehiculos, 'vehiculos');
  }, [])


  const [abrirM, setAbrirModal] = useState(false);
  const [accion, setAccion] = useState('');
  const [method, setMethod] = useState({ add: false, edit: false });
  const [vehiculoDatos, setVehiculoDatos] = useState({
    id: '',
    matricula: '',
    marca: '',
    modelo: '',
    color: '',
    clienteID: ''
  })
  const cleanForm = {
    id: '',
    matricula: '',
    marca: '',
    modelo: '',
    color: '',
    clienteID: ''
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
      setVehiculoDatos(cleanForm);
    }
  }
  const handResult = (data) => {

    if (data.data.estado) {
      if (method.add) {
        setVehiculos(dataVehiculos.concat(data.data.data))
      } else if (method.edit) {
        let index = 0;
        dataVehiculos.map((vehiculo, i) =>
          (vehiculo.id === data.data.data.id) ?
            index = i : null
        )
        let newdata = dataVehiculos;
        newdata[index] = data.data.data;
        setVehiculos(newdata);
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
    setVehiculoDatos((datosPrevios) => ({
      ...datosPrevios,
      [name]: value
    }))

  }
  const handleEdit = (vehiculo) => {
    setMethod({ add: false, edit: true });
    abrirModal('Editar');
    setVehiculoDatos(vehiculo);
  }
  const accionForm = () => {
    if (method.add) {
      PostData(handResult, handleFormVehiculo(vehiculoDatos), 'vehiculos');
    } else {

      PutData(vehiculoDatos.id, handleFormVehiculo(vehiculoDatos), handResult, 'vehiculos');

    }
  }
  const eliminar = (id) => {
    if (window.confirm("Estas seguro que deseas eliminar este registro?")) {
      const newData = dataVehiculos.filter(vehiculo =>
        vehiculo.id !== id
      )
      DeleteData(id, handResult, 'vehiculos');
      setVehiculos(newData);
    }
  }

  return (
    <div className='container page'>
      <h1 className='mb-3 mt-3'>Vehiculos</h1>
      <Alert
        msjAlert={msjAlert}
        setMsjAlert={setMsjAlert}
      />
      <button onClick={() => abrirModal("Agregar")} className="btn btn-primary m-3">Agregar</button>

      <TablaPaginacion
        columns={VehiculosColumns}
        data={dataVehiculos}
        eliminar={eliminar}
        handleEdit={handleEdit}
      />

      <ModalVehiculo
        handleChange={handleChange}
        vehiculoDatos={vehiculoDatos}
        abrirModal={abrirModal}
        accionForm={accionForm}
        abrirM={abrirM}
        accion={accion}
      />
    </div>
  )
}
