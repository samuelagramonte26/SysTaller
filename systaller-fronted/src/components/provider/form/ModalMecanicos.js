import React from "react";
import { Modal, Form, Button} from "react-bootstrap";

export const ModalMecanico =  (props)=>{

    return(
        <Modal show={props.abrirM} onHide={() => props.abrirModal()}>
        <Modal.Header closeButton>
          <Modal.Title>{props.accion} Mecanico</Modal.Title>
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
                value={props.mecanicoDatos && props.mecanicoDatos.nombre}
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
                value={props.mecanicoDatos && props.mecanicoDatos.apellido}

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
                value={props.mecanicoDatos && props.mecanicoDatos.cedula}

              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Fecha de nacimiento</Form.Label>
              <Form.Control
                type="date"
                placeholder="Fecha 0000-00-00"
                autoFocus
                name="fechaNacimiento"
                onChange={props.handleChange}
                value={props.mecanicoDatos && props.mecanicoDatos.fechaNacimiento}

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
