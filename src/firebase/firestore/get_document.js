import { db, doc, getDoc, query, onSnapshot,collection,orderBy, getDocs} from "../configuraciones.js";

export const getDocUser = async(idDoc) => {
    const docRef = await doc(db, "user-account", idDoc);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        /* console.log(docSnap.data()) */
        return docSnap.data()
    } else {
        return console.log("No such document!")
    }
}
export const getDocPoint = async(idDoc) => {
    const docRef = await doc(db, "point-account", idDoc);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        return console.log("No such document!")
    }
}

export const getUserPublications = async (callback) => {
    const q = query(collection(db, "user-publication"),orderBy('timestamp',"desc"))
    return onSnapshot(q, callback)
}
export const getPublished = async(idDoc) => {
    const docRef = await doc(db, "user-publication", idDoc);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        /* console.log(docSnap.data()) */
        return docSnap.data()
    } else {
        return console.log("No such document!")
    }
}

export const getPointPublications = () => {
    onSnapshot(collection(db, "point-publication"), (querySnapshot) => {
        querySnapshot.map(publications  => {
            console.log(publications.data())
            return publications.data()
        });
    });
}