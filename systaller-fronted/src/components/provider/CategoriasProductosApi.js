import Axios from "axios";
import {Uris} from "../provider/common/BaseUri"
export const GetCategoriasProductos = async(setCategoriasProductos) => {
   
      await Axios.get(Uris('categoriaProductos').get)
  
        .then(data => setCategoriasProductos(data.data))
        .catch(e => console.log(e))
    
 
}
