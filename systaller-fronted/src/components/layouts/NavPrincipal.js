import React from 'react'
import { NavLink, useParams } from 'react-router-dom'

import { Nav,Navbar,Container,NavDropdown } from 'react-bootstrap'
const path = window.location.pathname;

export const NavPrincipal = () => {
 
    return (
        
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <NavLink className='navbar-brand' to='/'>SYS_TALLER</NavLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink className='nav-link' to='/facturacion' >Facturacion</NavLink>
                        <NavLink className='nav-link' to='/mecanicoReparacion'>Asignaciones</NavLink>
                        <NavDropdown title="Mantenimientos" id="collasible-nav-dropdown">
                        <NavLink className='dropdown-item'to='/clientes'>Clientes</NavLink>
                        <NavLink className='dropdown-item'to='/vehiculos'>Vehiculos</NavLink>
                        <NavLink className='dropdown-item'to='/mecanicos'>Mecanicos</NavLink>
                        <NavLink className='dropdown-item'to='/taller'>Taller</NavLink>

                        <NavLink className='dropdown-item'to='/reparacion'>Reparaciones</NavLink>
                      
                        <NavLink className='dropdown-item'to='/productos'>Productos y servicios</NavLink>
                           <NavLink className='dropdown-item'to='/categoriaProductos'>Categorias Productos y servicios</NavLink>
                           <NavDropdown.Divider/>
                           <NavLink className='dropdown-item'to='/usuarios'>Usuarios</NavLink>
                        <NavLink className='dropdown-item'to='/tipoUsuarios'>Tipo usuarios</NavLink>

                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <NavLink className='nav-link' to="/registro">Registro</NavLink>
                       <NavLink className='nav-link' to='/login'>Login</NavLink>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
