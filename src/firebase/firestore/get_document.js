import { db, doc, getDoc } from "../configuraciones.js";

export const getDocUser= async(idDoc) =>{
    const docRef = await doc(db, "user-account", idDoc);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        return console.log("No such document!")
    }
}
export const getDocPoint= async(idDoc) =>{
    const docRef = await doc(db, "point-account", idDoc);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        return console.log("No such document!")
    }
}
