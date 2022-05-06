import Axios from "axios";
import {Uris} from "../provider/common/BaseUri"
export const GetFacturas = async(setFacturas) => {
   
      await Axios.get(Uris('facturacion').get)
  
        .then(data => setFacturas(data.data))
        .catch(e => console.log(e))
    
 
}
export const GetFactura = async(setData,id) => {
   
  await Axios.get(Uris('facturacion',id).getID)

    .then(data => setData(data.data))
    .catch(e => console.log(e))


}
export const PostFactura = async(id) => {
   
  await Axios.post(Uris('facturacion',id).postID)

    .then(data => console.log(data.data))
    .catch(e => console.log(e))


}
