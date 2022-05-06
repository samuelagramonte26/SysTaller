import Axios from "axios";
import {Uris} from "../provider/common/BaseUri"
export const GetData = async(set,seccion) => {
   
    await Axios.get(Uris(seccion).get)
  
      .then(data => set(data.data))
      .catch(e => console.log(e))
  
  
  }
  export const DeleteData = async (id, handResult,seccion) => {
    await Axios.delete(Uris(seccion,id).delete)
        .then(data => handResult(data))
        .catch(e => console.log(e))
  }
  
  export const PostData = async (handResult, handleForm,seccion) => {
    await Axios.post(Uris(seccion).post, handleForm)
        .then(data => {
            handResult(data)
        })
        .catch(e => console.log(e))
  }
  export const PutData = async (id,handleForm,handResult,seccion) => {
    await Axios.post(Uris(seccion,id).put, handleForm)
      .then(data => {
       
        handResult(data)
      })
      .catch(e => console.log(e))
  }