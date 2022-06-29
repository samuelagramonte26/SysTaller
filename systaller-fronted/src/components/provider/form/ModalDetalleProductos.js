import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { GetData } from "../Api";

export const ModalDetalleProductos = (props) => {
  
    return (
        <Modal show={props.abrirM} onHide={() => props.abrirModal()}>
            <Modal.Header closeButton>
                <Modal.Title>{props.accion} Productos y servicios a reparacion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Producto</Form.Label>
                        <Form.Select aria-label="Default select example" name="productoID" onChange={props.handleChange}
                        >
                            <option>-- Seleccionar --</option>
                            {props.productoDatos &&
                                props.productoDatos.map((producto) => {
                                    return (
                                        <option key={producto.id} value={producto.id}>{producto.producto} </option>
                                    )
                                })

                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Costo</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="0.00"
                            autoFocus
                            name="precio"
                            onChange={props.handleChange}
                            

                        />
                    </Form.Group>                        

                   
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="1"
                            autoFocus
                            name="cantidad"
                            onChange={props.handleChange}
                           
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
