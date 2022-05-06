import Axios from "axios";
import {Uris} from "../provider/common/BaseUri"
export const GetTaller = async(setTaller) => {
   
      await Axios.get(Uris('taller').get)
  
        .then(data => setTaller(data.data))
        .catch(e => console.log(e))
    
 
}
