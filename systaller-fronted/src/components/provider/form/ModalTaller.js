import React from "react";
import { Modal, Form, Button} from "react-bootstrap";

export const ModalTaller =  (props)=>{

    return(
        <Modal show={props.abrirM} onHide={() => props.abrirModal()}>
        <Modal.Header closeButton>
          <Modal.Title>{props.accion} datos taller</Modal.Title>
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
                value={props.tallerDatos && props.tallerDatos.nombre}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>RNC</Form.Label>
              <Form.Control
                type="text"
                placeholder="000-00000-0"
                autoFocus
                name="rnc"
                onChange={props.handleChange}
                value={props.tallerDatos && props.tallerDatos.rnc}

              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                placeholder="Example@email.com"
                autoFocus
                name="correo"
                onChange={props.handleChange}
                value={props.tallerDatos && props.tallerDatos.correo}

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
                value={props.tallerDatos && props.tallerDatos.direccion}

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
                value={props.tallerDatos && props.tallerDatos.telefono}

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
