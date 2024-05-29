import { db, doc, deleteDoc} from "../configuraciones.js";


export const deletePublicationDocument = async(idDocument) => {
    try{
        await deleteDoc(doc(db, "user-publication", idDocument));
    }catch(error){
        console.log(error)
    }
}