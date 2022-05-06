import Axios from "axios";
import {Uris} from "../provider/common/BaseUri"
export const GetMecanicoReparacion = async(setMecanicoReparacion) => {
   
      await Axios.get(Uris('mecanicoReparacion').get)
  
        .then(data => setMecanicoReparacion(data.data))
        .catch(e => console.log(e))
    
 
}
