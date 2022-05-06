import Axios from "axios";
import {Uris} from "../provider/common/BaseUri"
export const GetVehiculos = async(setVehiculos) => {
   
      await Axios.get(Uris('vehiculos').get)
  
        .then(data => setVehiculos(data.data))
        .catch(e => console.log(e))
    
 
}
