import * as React from 'react';

import TablePagination from '@mui/material/TablePagination';
import { Link } from 'react-router-dom';
import {PostFactura} from './provider/FacturasApi'

export default function TablaPaginacion({ columns, data, reparacion, facturacion, disable,facturar,eliminar,handleEdit }) {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <table className="table table-hover mt-3">
        <thead className="table-dark">
          <tr>
            {
              columns.map((element, i) => {
                return (
                  <th key={(i + 1)}>{element.label}</th>
                )
              })
            }
            {
              !disable && !disable ? <th>Acciones</th> : <th></th>
            }

          </tr>
        </thead>

        <tbody>

          {
            data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {

              return (
                <tr key={row.id}>
                  {
                    columns.map((col, i) => {
                      return (
                        <td key={(i + 1)}>{row[col.id]}</td>

                      )
                    })
                  }


                  <td>
                    {
                      !disable && !disable ? (<>
                        <button className="btn btn-warning" onClick={() => handleEdit(row)} ><i className="bi bi-pencil-square"></i>Editar</button>{"  "}
                        <button onClick={() => eliminar(row.id)} className="btn btn-danger" ><i className="bi bi-trash3"></i>Eliminar</button>{" "}
                      </>
                      ) : ''
                    }

                    {
                      reparacion || facturacion ? (
                        <Link className="btn btn-info" to={`detalle/${row.id}`}  ><i className="bi bi-pencil-square"></i>Ver Detalles</Link>

                      ) : ''
                    }{" "}
                    {
                      facturacion && facturacion ? (
                        <Link className="btn btn-success" target='_black' to={`/imprimir/${row.id}`}  ><i className="bi bi-pencil-square"></i>Imprimir</Link>

                      ) : ''
                    }{" "}
                    {
                      facturar && <button className="btn btn-success" onClick={()=>PostFactura(row.id)}  >Facturar</button>
                    }
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>


      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

    </>
  );
}
