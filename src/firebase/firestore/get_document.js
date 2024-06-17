import { db, doc, getDoc, query, where, onSnapshot,collection,orderBy, getDocs} from "../configuraciones.js";

async function getRegistrationDocument(typeAccount, idDoc) {

    const docRef = await doc(db, typeAccount, idDoc);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) return docSnap.data()

}

const getUsersPublications = async (callback) => {

    const q = query(collection(db, "user-publication"),orderBy('timestamp',"desc"))
    onSnapshot(q, callback)

}

const getUserPublications = async (idUser, callback) => {

    const q = query(collection(db, "user-publication"), where("id_user", "==", idUser), orderBy('timestamp',"desc"))
    onSnapshot(q, callback)

}

const getPublished = async(idDoc, documentType) => {

    const docRef = await doc(db, documentType, idDoc);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists())  return docSnap.data()

}

const getPointPublications = () => {

    onSnapshot(collection(db, "point-publication"), (querySnapshot) => {
        querySnapshot.map(publications  => {
            return publications.data()
        });
    });

}

export{
    getUsersPublications,
    getRegistrationDocument,
    getUserPublications,
    getPublished,
    getPointPublications
}