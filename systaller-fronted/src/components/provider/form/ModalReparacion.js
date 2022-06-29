import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { GetData,GetDataID } from "../Api";

export const ModalReparacion = (props) => {
    const [clientes, setClientes] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);
    const [clienteID,setClienteID] = useState(null);
    useEffect(() => {
        GetData(setClientes, 'cliente');
    }, [])
    useEffect(()=>{
        GetDataID(setVehiculos,'vehiculoCliente',clienteID);
    },[clienteID])
    const  getClienteID = (e) =>{
       console.log(vehiculos)
       const  {value} = e.target;
       setClienteID(value);
       console.log(value)
    }

    return (
        <Modal show={props.abrirM} onHide={() => props.abrirModal()}>
            <Modal.Header closeButton>
                <Modal.Title>{props.accion} Entrada a Reparacion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Cliente</Form.Label>
                        <Form.Select aria-label="Default select example" name="clienteID"  onChange={(e)=>{
                            props.handleChange(e)
                            getClienteID(e)
                        }}
                        >
                            <option>-- Seleccionar --</option>
                            {clientes &&
                                clientes.map((cliente) => {
                                    return (
                                        <option key={cliente.id} value={cliente.id}>{cliente.nombre} {cliente.apellido}</option>
                                    )
                                })

                            }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Vehiculo</Form.Label>
                        <Form.Select aria-label="Default select example" name="vehiculoID" onChange={props.handleChange}
                        >
                            <option>-- Seleccionar --</option>
                            {vehiculos &&
                                vehiculos.map((vehiculo) => {
                                    return (
                                        <option key={vehiculo.id} value={vehiculo.id}>{vehiculo.modelo} {vehiculo.color}</option>
                                    )
                                })

                            }
                        </Form.Select>
                    </Form.Group>
                      
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Fecha de entrada</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="0000-00-00"
                            autoFocus
                            name="fechaEntrada"
                            onChange={props.handleChange}
                            value={props.reparacionDatos && props.reparacionDatos.fechaEntrada}

                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Comentario</Form.Label>
                        <Form.Control 
                        name="comentario"
                         onChange={props.handleChange} 
                         value={props.reparacionDatos && props.reparacionDatos.comentario}
                         as="textarea" 
                         rows={3}
                          />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.abrirModal()}>
                    Cerra
                </Button>
                <Button variant="primary" onClick={() => props.accionForm()} >
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>

    )
}
