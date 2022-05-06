import React from "react";
import { Modal, Form, Button} from "react-bootstrap";

export const ModalCliente =  (props)=>{

    return(
        <Modal show={props.abrirM} onHide={() => props.abrirModal()}>
        <Modal.Header closeButton>
          <Modal.Title>{props.accion} Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                autoFocus
                name="nombre"
                onChange={props.handleChange}
                value={props.clienteDatos && props.clienteDatos.nombre}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Apellido"
                autoFocus
                name="apellido"
                onChange={props.handleChange}
                value={props.clienteDatos && props.clienteDatos.apellido}

              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Cedula</Form.Label>
              <Form.Control
                type="text"
                placeholder="Cedula"
                autoFocus
                name="cedula"
                onChange={props.handleChange}
                value={props.clienteDatos && props.clienteDatos.cedula}

              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Direccion</Form.Label>
              <Form.Control
                type="text"
                placeholder="Direccion"
                autoFocus
                name="direccion"
                onChange={props.handleChange}
                value={props.clienteDatos && props.clienteDatos.direccion}

              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="text"
                placeholder="Telefono"
                autoFocus
                name="telefono"
                onChange={props.handleChange}
                value={props.clienteDatos && props.clienteDatos.telefono}

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
