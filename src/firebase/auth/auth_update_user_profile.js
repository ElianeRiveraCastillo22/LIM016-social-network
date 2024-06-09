import { auth, updateProfile } from "../configuraciones.js";

export async function updateIdentificationDocument(dataToUpdate) {
    try{
        await updateProfile(auth.currentUser, dataToUpdate)
        console.log("cambio")
    }catch(error){
        console.log(error)
    }finally{
        console.log("se se actulizo los datos del perfil en auth")
    }
}
