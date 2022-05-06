
export const GetClientes = async(setClientes) => {
   
      await Axios.get(Uris('cliente').get)
  
        .then(data => setClientes(data.data))
        .catch(e => console.log(e))
    
 
}