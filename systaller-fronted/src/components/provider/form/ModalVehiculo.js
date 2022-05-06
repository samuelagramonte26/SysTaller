import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { GetData } from "../Api";

export const ModalVehiculo = (props) => {
    const [clientes, setCliente] = useState([]);
    useEffect(() => {
        GetData(setCliente, 'cliente');
    }, [])
    return (
        <Modal show={props.abrirM} onHide={() => props.abrirModal()}>
            <Modal.Header closeButton>
                <Modal.Title>{props.accion} Vehiculo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Matricula</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Matricula"
                            autoFocus
                            name="matricula"
                            onChange={props.handleChange}
                            value={props.vehiculoDatos && props.vehiculoDatos.matricula}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Color</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Color"
                            autoFocus
                            name="color"
                            onChange={props.handleChange}
                            value={props.vehiculoDatos && props.vehiculoDatos.color}

                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Marca</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Marca"
                            autoFocus
                            name="marca"
                            onChange={props.handleChange}
                            value={props.vehiculoDatos && props.vehiculoDatos.marca}

                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Modelo</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Modelo"
                            autoFocus
                            name="modelo"
                            onChange={props.handleChange}
                            value={props.vehiculoDatos && props.vehiculoDatos.modelo}

                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Cliente</Form.Label>
                        <Form.Select aria-label="Default select example" name="clienteID" onChange={props.handleChange}
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
