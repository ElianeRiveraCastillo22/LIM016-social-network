import { db, doc, updateDoc ,arrayUnion, increment,arrayRemove} from "../configuraciones.js";

const updateRegistrationDoc = async(idUser, typeAccount, dataUpdate)=> {

    const userData = doc(db, typeAccount, idUser);
    await updateDoc(userData, dataUpdate)

}

const updatePublicationDocument = async(idPublication,typeAccount, datatoUpdate)=> {

    const userData = doc(db, typeAccount, idPublication);
    await updateDoc(userData, datatoUpdate)

}

async function updatePublicationID (collection, idDoc, objCurrentSettings){

    const docCollection = doc(db, collection, idDoc);
    await updateDoc(docCollection, objCurrentSettings);

}

async function updateTheIdentifiersOfUserPublications(collection, idDoc, newPublicationID){

    const docCollection = doc(db, collection, idDoc);
    await updateDoc(docCollection, {
        publications_made: arrayUnion(newPublicationID)
    });

}

async function updatesUsersWhoLike(collection, idDoc, usersWhoLiked){

    const docCollection = doc(db, collection, idDoc);
    await updateDoc(docCollection, {
        usersWhoLiked: arrayUnion(usersWhoLiked)
    });

}

async function deletePublicationOfRegistrationDocument(collection, idUser, idPublications){

    const docCollection = doc(db, collection, idUser);
    const prueba = await updateDoc(docCollection, {
        publications_made: arrayRemove(idPublications)
    });

}

async function updateWhoDeletedLike(collection, idDoc, usersWhoLiked){

    const docCollection = doc(db, collection, idDoc);
    const prueba = await updateDoc(docCollection, {
        usersWhoLiked: arrayRemove(usersWhoLiked)
    });

}

async function updateLikesValues(collection, idDoc, increasedOrDecreased,usersWhoLiked){

    const docCollection = doc(db, collection, idDoc);
    await updateDoc(docCollection, {
        likes: increment(increasedOrDecreased)
    });

}

export{
    updateRegistrationDoc,
    updatePublicationDocument,
    updatePublicationID,
    updateTheIdentifiersOfUserPublications,
    updatesUsersWhoLike,
    deletePublicationOfRegistrationDocument,
    updateWhoDeletedLike,
    updateLikesValues
}

