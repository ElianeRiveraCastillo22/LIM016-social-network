import { db, collection, addDoc } from "../configuraciones";

export const addPostFirestore = async (objPost) =>{
    // Add a new document with a generated id.
    const docRef = await addDoc( collection(db, "post"), objPost );
    console.log("Document written with ID: ", docRef.id);
}