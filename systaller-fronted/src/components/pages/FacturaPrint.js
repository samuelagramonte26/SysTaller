import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { GetFactura } from '../provider/FacturasApi';

export const FacturaPrint = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    useEffect(() => {
        GetFactura(setData, id)
    }, [])
    //console.log(data)
    const { factura, detallles, mecanicos, subtotal } = data;
    // console.log(factura, detallles)
    useEffect(() => {
        setTimeout(() => {
            window.print();
        }, 3000)

    }, [data])
    return (

        <div className="wrapper">

            <section className="invoice">

            <div className="row">
                    <div className="col-12">
                        <h2 className="page-header">
                            <i className="fas fa-globe"></i>Factura<br />
                          
                        </h2>
                    </div>
                </div>
                <div className="row ">
                        <div className="col-sm-4 invoice-col">
                        <h2 className="page-header">
                            <i className="fas fa-globe"></i>{factura && factura[0].nombre}<br />
                            <small className="float-right">Fecha:{factura && factura[0].fecha}</small>
                        </h2>
                    </div>
                </div>
                <div className='titulo'>
                    <div className="row invoice-info">
                        <div className="col-sm-4 invoice-col">

                            <address>
                                <strong>Datos de negocio</strong><br />
                                <p><b>Direccion:</b>{factura && factura[0].direccion}</p>
                                <p><b>Telefono:</b>{factura && factura[0].telefono}</p>
                                <p><p>RNC:</p>{factura && factura[0].rnc}</p>
                                <p><b>Correo:</b>{factura && factura[0].correo}</p>
                            </address>
                        </div>
                    </div>
                    <div className="col-sm-4 invoice-col">

                        <address>
                            <strong>Datos de Cliente</strong><br />
                            <p><b>Cliente:</b>{factura && factura[0].cliente}</p>
                            <p><b>Apellido:</b>{factura && factura[0].apellido}</p>
                            <p><b>Color:</b>{factura && factura[0].color}</p>

                            <p><b>Matricula:</b>{factura && factura[0].matricula}</p>
                        </address>
                    </div>

                    <div className="col-sm-4 invoice-col">

                        <b>Fecha:</b> {factura && factura[0].fecha}<br />
                        <b>No.:</b> {factura && factura[0].numero}<br />

                    </div>
                </div>


                <div className="row">
                    <div className="col-12 table-responsive">
                        <h1>Detalles</h1>
                        <table className="table table-striped">

                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {


                                    detallles && detallles.map((detalle, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{detalle.producto}</td>
                                                <td>{detalle.cantidad}</td>
                                                <td>{detalle.precio}</td>
                                                <td>{detalle.subTotal}</td>

                                            </tr>
                                        )
                                    })
                                }


                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="row">
                    <div className="col-12 table-responsive">
                        <h1>Mecanicos</h1>
                        <table className="table table-striped">

                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellido</th>

                                </tr>
                            </thead>
                            <tbody>
                                {


                                    mecanicos && mecanicos.map((mecanico, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{mecanico.nombre}</td>
                                                <td>{mecanico.apellido}</td>
                                            </tr>
                                        )
                                    })
                                }


                            </tbody>
                        </table>
                    </div>

                </div>

                <div className="alinear">
                    <h4 className="lead"><b>Monto a pagar:</b></h4>
                    <hr />
                    <p><b>Itbis:</b> {factura && factura[0].itbis}</p>
                    <p><b>SubTotal:</b> {subtotal && subtotal}</p>
                    <p><b>Total:</b> {factura && factura[0].total}</p>


                </div>

            </section>

        </div>
    );
}
