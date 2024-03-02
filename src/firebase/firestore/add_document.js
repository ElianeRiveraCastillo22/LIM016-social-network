import { db, doc, setDoc } from "../configuraciones.js";

export const addUserToFirestore = async (email,id,name,psw,publications_made,url_profile,typeOfRegistration,active_session) =>{
    // Add a new document with a generated id.
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
export const addPointToFirestore = async (id,name,url_profile,email,psw,description,publications_received,published_offers,typeOfRegistration,active_session) =>{
    // Add a new document with a generated id.
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