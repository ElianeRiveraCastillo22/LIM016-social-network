import { addDoc, collection, db, doc, setDoc } from "../configuraciones.js";

export const addUserToFirestore = async (email,id,name,psw,publications_made,url_profile,typeOfRegistration,active_session) =>{

     await setDoc(doc(db, "user-account", id), {
        email,
        id,
        name,
        psw,
        publications_made,
        url_profile,
        typeOfRegistration,
        nameRegister:"user-account",
        active_session
    } );

}
export const addRecordToFirestore = async ( typeRegister, id, registrationData) =>{
    try{
        await setDoc(doc(db, typeRegister, id), registrationData);
    }catch(error){
        console.log(error)
    }finally{
        console.log("se envio registro a firestore")
    }
}

export const addPointToFirestore = async (id,name,url_profile,email,psw,description,publications_received,published_offers,typeOfRegistration,active_session) =>{

    await setDoc( doc(db, "point-account",id), {
        id,
        name,
        url_profile,
        email,
        psw,
        description,
        publications_received,
        published_offers,
        typeOfRegistration,
        nameRegister:"point-account",
        active_session
    } );

}

export const createPost = async (objData) => {

    const docRef = await addDoc(collection(db, "user-publication"), objData)
    return docRef

}

export const createOffer = async (id_point, description, start_date, end_date, url_reference, id_offer,timestamp) => {

    const docRef = await addDoc(collection(db, "point-publication"), {
        id_point,
        description,
        start_date,
        end_date,
        url_reference,
        id_offer,
        timestamp
    });
    console.log("Document written with ID: ", docRef.id);
}