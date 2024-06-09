import { updateRegistration } from "../firebase/firestore/update_document.js";
import { Account } from "../helpers/constructores/index.js";
import { locationHome } from "../helpers/locations.js";
import { functionsOfTheChosenRecordType } from "../helpers/updateUser/functionsOfTheChosenRecordType.js";
import { undefinedAccountTypeFunctions } from "../helpers/updateUser/undefinedAccountTypeFunctions.js";
import { updateRegistrationDocumentData } from "../helpers/updateUser/updateRegistrationDocumentData.js";
import { updateProfile } from "./templates/updateProfile.js";
import { templateTypePoint, templateTypeUser } from "./templates/updateUser_cases.js";

export const updateUser = ( ) => {

    const sectionupdateProfile = document.createElement('div');
    sectionupdateProfile.setAttribute('class', 'section--updateProfile');
    sectionupdateProfile.innerHTML = updateProfile;

    const containerInputsForm= sectionupdateProfile.querySelector(".updateProfile__containerForm")
    const btnRegisterupdate = sectionupdateProfile.querySelector("#btnRegisterupdate")
    const imgUser= sectionupdateProfile.querySelector(".updatePorfile__imgUser img")

    if(localStorage.getItem("providerId") == "google.com") undefinedAccountTypeFunctions(containerInputsForm,btnRegisterupdate,imgUser)
    else functionsOfTheChosenRecordType(containerInputsForm,btnRegisterupdate)

    return sectionupdateProfile;
}
