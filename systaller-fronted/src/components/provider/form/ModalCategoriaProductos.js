import React from "react";
import { Modal, Form, Button} from "react-bootstrap";

export const ModalCategoriaProductos =  (props)=>{

    return(
        <Modal show={props.abrirM} onHide={() => props.abrirModal()}>
        <Modal.Header closeButton>
          <Modal.Title>{props.accion} Categoria de producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Categoria</Form.Label>
              <Form.Control
                type="text"
                placeholder="Categoria"
                autoFocus
                name="categoria"
                onChange={props.handleChange}
                value={props.categoriaDatos && props.categoriaDatos.categoria}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                type="text"
                placeholder="Descripcion"
                autoFocus
                name="descripcion"
                onChange={props.handleChange}
                value={props.categoriaDatos && props.categoriaDatos.descripcion}
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
