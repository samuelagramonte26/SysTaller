import Axios from "axios";
import {Uris} from "../provider/common/BaseUri"
export const GetDetalleReparacion = async(setDetalleReparacion,id) => {
   
      await Axios.get(Uris('detalleReparacion',id).getID)
  
        .then(data => setDetalleReparacion(data.data))
        .catch(e => console.log(e))
    
 
}
export const PostTerminarReparacion = async(id,setTerminarReparacion,dataDetalleReparacion) => {
   
  await Axios.get(Uris('terminarReparacion',id).getID)

    .then(data =>{
      const newData  = dataDetalleReparacion.filter(x => x.id !== id);
     setTerminarReparacion(newData)

        })    .catch(e => console.log(e))


}