import { useState, useEffect } from "react";
import { GetClientes } from "../provider/ClienteApi";

export const Estado = () => {
  const   [dataClientes, setClientes] = useState([]);
    return { data: dataClientes, setdata: setClientes }
}
export const Efecto = () => {
    useEffect(() => {
        GetClientes(Estado().setData);
    }, [])
}
