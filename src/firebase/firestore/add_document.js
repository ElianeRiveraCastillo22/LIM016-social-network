import { addDoc, collection, db, doc, setDoc } from "../configuraciones.js";

export const addRecordToFirestore = async ( typeRegister, id, registrationData) =>{

    try{

        await setDoc(doc(db, typeRegister, id), registrationData);

    }catch(error){

        console.log(error)

    }

}

export const createPost = async (objData) => {

    const docRef = await addDoc(collection(db, "user-publication"), objData)
    return docRef

}
