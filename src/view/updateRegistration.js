import { functionsOfTheChosenRecordType } from "../helpers/updateUser/functionsOfTheChosenRecordType.js";
import { undefinedAccountTypeFunctions } from "../helpers/updateUser/undefinedAccountTypeFunctions.js";
import { updateProfile } from "./templates/updateProfile.js";

export const updateRegistration = ( ) => {

    const sectionupdateProfile = document.createElement('div');
    sectionupdateProfile.setAttribute('class', 'section--updateProfile');
    sectionupdateProfile.innerHTML = updateProfile;

    const containerInputsForm= sectionupdateProfile.querySelector(".updateProfile__containerForm")
    const btnRegisterupdate = sectionupdateProfile.querySelector("#btnRegisterupdate")
    const imgUser= sectionupdateProfile.querySelector(".updateProfile__imgUser img")

    if (localStorage.getItem("registrationInTheFirstInstance")) {

    }else{
        const navegador = document.querySelector("#navegador")
        navegador.style.display="none"

        if(localStorage.getItem("providerId") == "google.com") undefinedAccountTypeFunctions(containerInputsForm,btnRegisterupdate,imgUser,navegador)
        else functionsOfTheChosenRecordType(containerInputsForm,btnRegisterupdate,navegador)

    }

    return sectionupdateProfile;
}
