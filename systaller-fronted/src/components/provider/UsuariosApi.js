import Axios from "axios";
import {Uris} from "../provider/common/BaseUri"
export const GetUsuarios = async(setUsuarios) => {
   
      await Axios.get(Uris('usuarios').get)
  
        .then(data => setUsuarios(data.data))
        .catch(e => console.log(e))
    
 
}
