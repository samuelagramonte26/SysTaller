import Axios from "axios";
import {Uris} from "../provider/common/BaseUri"
export const GetTipoUsuarios = async(setTipoUsuarios) => {
   
      await Axios.get(Uris('tipoUsuarios').get)
  
        .then(data => setTipoUsuarios(data.data))
        .catch(e => console.log(e))
    
 
}
