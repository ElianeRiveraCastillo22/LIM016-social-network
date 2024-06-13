import { getPublished } from "../../firebase/firestore/get_document.js"
import { locationHome, locationUpdateUser } from "../locations.js"

export async function getFirebaseRegistration(registrationData) {

    try{

        const existingUser = await getPublished(registrationData.user.uid, "user-account")
        const existingPlace = await getPublished(registrationData.user.uid, "point-account")

        function saveLogDataInTheLocalstorage(document) {
            localStorage.setItem("photoURLUser", document.photoURLUser)
            localStorage.setItem("uidUser", document.uid)
            localStorage.setItem("displayName", document.displayName)
            localStorage.setItem("typeRegister", document.typeRegister)
            localStorage.setItem("activeSession", true)
            localStorage.setItem("registrationInTheFirstInstance", document.registrationInTheFirstInstance)
        }

        if(existingUser){

            saveLogDataInTheLocalstorage(existingUser)
            locationHome()

        }

        if(existingPlace){

            saveLogDataInTheLocalstorage(existingPlace)
            localStorage.setItem("description", existingPlace.description)
            locationHome()

        }

        if(!existingUser && !existingPlace) locationUpdateUser()

    }catch(error){

        console.log(error)

    }
}