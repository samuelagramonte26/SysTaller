import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from "../components/pages/Home";
import { Login } from "../components/pages/Login";
import { NavPrincipal } from "../components/layouts/NavPrincipal";
import { Footer } from "../components/layouts/Footer";
import { Clientes } from "../components/pages/Clientes";
import { Vehiculos } from "../components/pages/Vehiculos";
import { Mecanicos } from "../components/pages/Mecanicos";
import { CategoriasPorductos } from "../components/pages/CategoriaProductos";
import { Productos } from "../components/pages/Productos";
import { Taller } from "../components/pages/Taller";
import { TipoUsuarios } from "../components/pages/TipoUsuarios";
import { Usuarios } from "../components/pages/Usuarios";
import { MecanicoReparacion } from "../components/pages/MecanicoReparacion";
import { Reparacion } from "../components/pages/Reparacion";
import { DetalleReparacion } from "../components/pages/DetalleReparacion";
import { Facturas } from "../components/pages/Facturas";
import { FacturaPrint } from "../components/pages/FacturaPrint";

export const RouterInicio = () => {
    const path = window.location.pathname;
    const mostrar =  path.startsWith('/imprimir');
    
    return (

        <BrowserRouter>
        {
            !mostrar &&   <NavPrincipal/>
        }
    
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/vehiculos" element={<Vehiculos />} />
                <Route path="/mecanicos" element={<Mecanicos />} />
                <Route path="/reparacion/*" element={<Reparacion />}>
                    <Route path="detalle/:id" element={<DetalleReparacion />} />
                </Route>
                <Route path="/mecanicoReparacion" element={<MecanicoReparacion />} />
                <Route path="/taller" element={<Taller />} />
                <Route path="/facturacion" element={<Facturas />}>
                <Route path="detalle/:id" element={<DetalleReparacion disable={true}/>} />

                </Route>
                <Route path="/imprimir/:id" element={<FacturaPrint/>} />

                <Route path="/categoriaProductos" element={<CategoriasPorductos />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="*" element={<h1>404</h1>} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Login />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/tipoUsuarios" element={<TipoUsuarios />} />
            </Routes>
            {
            !mostrar &&    <Footer />
            }
            <Routes>

            </Routes>
        </BrowserRouter>


    );
}