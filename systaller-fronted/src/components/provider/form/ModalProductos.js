import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { GetData } from "../Api";

export const ModalProductos = (props) => {
    const [categorias, setCategorias] = useState([]);
    useEffect(() => {
        GetData(setCategorias, 'categoriaProductos');
    }, [])
    return (
        <Modal show={props.abrirM} onHide={() => props.abrirModal()}>
            <Modal.Header closeButton>
                <Modal.Title>{props.accion} Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Producto</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Producto"
                            autoFocus
                            name="producto"
                            onChange={props.handleChange}
                            value={props.productoDatos && props.productoDatos.producto}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Monto Inicial</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="0.00"
                            autoFocus
                            name="montoInicial"
                            onChange={props.handleChange}
                            value={props.productoDatos && props.productoDatos.montoInicial}

                        />
                    </Form.Group>                        

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Select aria-label="Default select example" name="categoriaID" onChange={props.handleChange}
                        >
                            <option>-- Seleccionar --</option>
                            {categorias &&
                                categorias.map((categoria) => {
                                    return (
                                        <option key={categoria.id} value={categoria.id}>{categoria.categoria} </option>
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
