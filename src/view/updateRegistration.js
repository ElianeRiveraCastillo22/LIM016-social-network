import { locationSignIn } from "../helpers/locations.js";
import { functionsOfTheChosenRecordType } from "../helpers/updateUser/functionsOfTheChosenRecordType.js";
import { undefinedAccountTypeFunctions } from "../helpers/updateUser/undefinedAccountTypeFunctions.js";
import { updateInSecondInstance} from "../helpers/updateUser/updateInSecondInstance.js";
import { updateProfile } from "./templates/updateProfile.js";

export const updateRegistration = ( ) => {

    if(localStorage.getItem("activeSession")=="true"){

        const sectionupdateProfile = document.createElement('div');
        sectionupdateProfile.setAttribute('class', 'section--updateProfile');
        sectionupdateProfile.innerHTML = updateProfile;

        const containerInputsForm= sectionupdateProfile.querySelector(".updateProfile__containerForm")
        const btnRegisterupdate = sectionupdateProfile.querySelector("#btnRegisterupdate")
        const imgUser= sectionupdateProfile.querySelector(".updateProfile__imgUser img")

        if(localStorage.getItem("registrationInTheFirstInstance")) {

            localStorage.setItem("path", "update-registration")

            updateInSecondInstance(sectionupdateProfile,containerInputsForm,btnRegisterupdate,imgUser)

        }else{

            const navegador = document.querySelector("#navegador")
            navegador.style.display="none"

            if(localStorage.getItem("providerId") == "google.com") undefinedAccountTypeFunctions(containerInputsForm,btnRegisterupdate,imgUser,navegador)
            else functionsOfTheChosenRecordType(containerInputsForm,btnRegisterupdate,navegador)

        }

        return sectionupdateProfile;
    }else{

        alert("inicia sesión 👀")
        locationSignIn()

    }
}
