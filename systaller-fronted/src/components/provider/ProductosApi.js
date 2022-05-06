import Axios from "axios";
import {Uris} from "../provider/common/BaseUri"
export const GetProductos = async(setProductos) => {
   
      await Axios.get(Uris('producto').get)
  
        .then(data => setProductos(data.data))
        .catch(e => console.log(e))
    
 
}
