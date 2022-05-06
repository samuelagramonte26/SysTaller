import Axios from "axios";
import {Uris} from "./common/BaseUri"
export const GetReparacion = async(setReparacion) => {
   
      await Axios.get(Uris('reparacion').get)
  
        .then(data => setReparacion(data.data))
        .catch(e => console.log(e))
    
 
}
export const GetReparacionTerminada = async(setReparacionTerminada) => {
   
  await Axios.get(Uris('reparacionTerminadas').get)

    .then(data => setReparacionTerminada(data.data))
    .catch(e => console.log(e))


}
