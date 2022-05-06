export const Uris = (seccion,id=null)=> {
    let baseUri = `http://localhost/SysTaller/public/api/`;
    return {
        get: baseUri+seccion,
        getID:`${baseUri}${seccion}/${id}`,
        post:`${baseUri}${seccion}/add`,
        postID:`${baseUri}${seccion}/add/${id}`,
        put:`${baseUri}${seccion}/edit/${id}`,
        delete:`${baseUri}${seccion}/delete/${id}`,
    }
};