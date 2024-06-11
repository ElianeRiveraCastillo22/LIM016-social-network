import { db, doc, getDoc, query, where, onSnapshot,collection,orderBy, getDocs} from "../configuraciones.js";

async function getRegistrationDocument(typeAccount, idDoc) {

    const docRef = await doc(db, typeAccount, idDoc);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) return docSnap.data()
    else  return console.log("No such document!")

}


const getDocUser = async(idDoc) => {

    const docRef = await doc(db, "user-account", idDoc);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) return docSnap.data()
    else return console.log("No such document!")

}

const getDocPoint = async(idDoc) => {

    const docRef = await doc(db, "point-account", idDoc);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) return docSnap.data()
    else return console.log("No such document!")

}
const getUsersPublications = async (callback) => {

    const q = query(collection(db, "user-publication"),orderBy('timestamp',"desc"))
    onSnapshot(q, callback)

}
const getUserPublications = async (idUser, callback) => {

    const q = query(collection(db, "user-publication"), where("id_user", "==", idUser), orderBy('timestamp',"desc"))
    onSnapshot(q, callback)

}

const getInstantPublicationQueries = async () => {

    const q =  query(collection(db, "user-publication"),orderBy('timestamp',"desc"))
    const querySnapshot = await getDocs(q);
    const publicactions = querySnapshot.docs.map((doc) => {
        return { ...doc.data() };
    })
    return publicactions

}

export const getPublished = async(idDoc, documentType) => {

    const docRef = await doc(db, documentType, idDoc);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists())  return docSnap.data()
    else return console.log("No such document!")

}

export const getPointPublications = () => {

    onSnapshot(collection(db, "point-publication"), (querySnapshot) => {
        querySnapshot.map(publications  => {
            return publications.data()
        });
    });

}

export{
    getDocUser,
    getDocPoint,
    getUsersPublications,
    getInstantPublicationQueries,
    getRegistrationDocument,
    getUserPublications
}