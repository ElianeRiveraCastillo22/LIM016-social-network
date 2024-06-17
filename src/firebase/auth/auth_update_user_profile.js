import { auth, updateProfile } from "../configuraciones.js";

export async function updateIdentificationDocument(dataToUpdate) {

    try{
        await updateProfile(auth.currentUser, dataToUpdate)

    }catch(error){

        console.log(error)

    }

}
