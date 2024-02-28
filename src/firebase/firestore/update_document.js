import { db, doc, updateDoc } from "../configuraciones.js";

export const updateRegistration = async(idUserobject, object,typeAccount)=> {
    const userData = doc(db, typeAccount, idUserobject);
    await updateDoc(userData, object)
}
