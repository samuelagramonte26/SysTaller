import React, { useEffect, useState } from 'react'
import TablaPaginacion from '../TablaPaginacion'
import { GetData,PostData,PutData,DeleteData } from '../provider/Api'
import { CategoriasProductosColumns } from '../provider/common/Columns'
import Alert from '../provider/common/Alert'
import { handleFormCategoria } from '../provider/common/Handle'
import {ModalCategoriaProductos} from '../provider/form/ModalCategoriaProductos'


export const CategoriasPorductos = () => {
    const [dataCategorias,setCategorias] = useState([])
    useEffect(()=>{
        GetData(setCategorias,'categoriaProductos');
    },[])
   
    const [abrirM, setAbrirModal] = useState(false);
    const [accion, setAccion] = useState('');
    const [method, setMethod] = useState({ add: false, edit: false });
    const [categoriaDatos, setCategoriaDatos] = useState({
      id: '',
      categoria: '',
      descripcion: '',
      
    })
    const cleanForm = {
      id: '',
      categoria: '',
      descripcion: '',
     
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
        setCategoriaDatos(cleanForm);
      }
    }
    const handResult = (data) => {
     
      if (data.data.estado) {
        if (method.add) {
          setCategorias(dataCategorias.concat(data.data.data))
        } else if (method.edit) {
          let index = 0;
          dataCategorias.map((categoria, i) =>
            (categoria.id === data.data.data.id) ?
              index = i : null
          )
          let newdata = dataCategorias;
          newdata[index] = data.data.data;
          setCategorias(newdata);
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
      setCategoriaDatos((datosPrevios) => ({
        ...datosPrevios,
        [name]: value
      }))
    }
    const handleEdit = (categoria) => {
      setMethod({ add: false, edit: true });
      abrirModal('Editar');
      setCategoriaDatos(categoria);
    }
    const accionForm = () => {
      if (method.add) {
        PostData(handResult, handleFormCategoria(categoriaDatos), 'categoriaProductos');
      } else {
  
        PutData(categoriaDatos.id, handleFormCategoria(categoriaDatos), handResult, 'categoriaProductos');
  
      }
    }
    const eliminar = (id) => {
      if (window.confirm("Estas seguro que deseas eliminar este registro?")) {
        const newData = dataCategorias.filter(categoria =>
          categoria.id !== id
        )
        DeleteData(id, handResult, 'categoriaProductos');
        setCategorias(newData);
      }
    }
  return (
    <div className='container page'>
        <h1 className='mb-3 mt-3'>Categoria productos y servicios</h1>
        <Alert
        msjAlert={msjAlert}
        setMsjAlert={setMsjAlert}
      />
      <button onClick={() => abrirModal("Agregar")} className="btn btn-primary m-3">Agregar</button>

        <TablaPaginacion
        columns={CategoriasProductosColumns}
        data={dataCategorias}
        eliminar={eliminar}
        handleEdit={handleEdit}
        />
    
    <ModalCategoriaProductos
        handleChange={handleChange}
        categoriaDatos={categoriaDatos}
        abrirModal={abrirModal}
        accionForm={accionForm}
        abrirM={abrirM}
        accion={accion}
      />

    </div>
  )
}
