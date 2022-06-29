import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

export const ModalMecanicoReparacion = (props) => {
  
    return (
        <Modal show={props.abrirM} onHide={() => props.abrirModal()}>
            <Modal.Header closeButton>
                <Modal.Title>{props.accion} Mecanico a Reparacion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
       
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Mecanicos</Form.Label>
                        <Form.Select aria-label="Default select example" name="mecanicoID" onChange={props.handleChange}
                        >
                            <option>-- Seleccionar --</option>
                            {props.dataMecanicos &&
                                props.dataMecanicos.map((mecanico) => {
                                    return (
                                        <option key={mecanico.id} value={mecanico.id}>{mecanico.nombre}  {mecanico.apellido}</option>
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
