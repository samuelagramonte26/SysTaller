import Axios from "axios";
import {Uris} from "../provider/common/BaseUri"
export const GetMecanicos = async(setMecanicos) => {
   
      await Axios.get(Uris('mecanicos').get)
  
        .then(data => setMecanicos(data.data))
        .catch(e => console.log(e))
    
 
}