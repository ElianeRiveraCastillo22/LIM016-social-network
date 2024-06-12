import { functionsOfTheChosenRecordType } from "../helpers/updateUser/functionsOfTheChosenRecordType.js";
import { undefinedAccountTypeFunctions } from "../helpers/updateUser/undefinedAccountTypeFunctions.js";
import { closeTheListOfUnclickedDetails } from "../helpers/updateUser/updateInSecondInstance.js";
import { updateProfile } from "./templates/updateProfile.js";
import { placeRegistrationTemplate, userRegistrationTemplate } from "./templates/updateUser_cases.js";

export const updateRegistration = ( ) => {

    const sectionupdateProfile = document.createElement('div');
    sectionupdateProfile.setAttribute('class', 'section--updateProfile');
    sectionupdateProfile.innerHTML = updateProfile;

    const containerInputsForm= sectionupdateProfile.querySelector(".updateProfile__containerForm")
    const btnRegisterupdate = sectionupdateProfile.querySelector("#btnRegisterupdate")
    const imgUser= sectionupdateProfile.querySelector(".updateProfile__imgUser img")



    if (localStorage.getItem("registrationInTheFirstInstance")) {
        function updateInSecondInstance(containerInputsForm,btnRegisterupdate){

            btnRegisterupdate.style.display="none"

            if(localStorage.getItem("typeRegister") == "user-account"){
                containerInputsForm.innerHTML = userRegistrationTemplate

                const inputName = containerInputsForm.querySelector(".updateProfile__name")
                const inputPassword = containerInputsForm.querySelector(".updateProfile__password")

                closeTheListOfUnclickedDetails(containerInputsForm)

            }

            if(localStorage.getItem("typeRegister") == "point-account"){
                containerInputsForm.innerHTML = placeRegistrationTemplate
                const inputName = containerInputsForm.querySelector(".updateProfile__name")
                const inputPassword = containerInputsForm.querySelector(".updateProfile__password")
                const inputDescription = containerInputsForm.querySelector(".updateProfile__description")

                closeTheListOfUnclickedDetails(containerInputsForm)

            }
        }
        updateInSecondInstance(containerInputsForm,btnRegisterupdate)
    }else{
        const navegador = document.querySelector("#navegador")
        navegador.style.display="none"

        if(localStorage.getItem("providerId") == "google.com") undefinedAccountTypeFunctions(containerInputsForm,btnRegisterupdate,imgUser,navegador)
        else functionsOfTheChosenRecordType(containerInputsForm,btnRegisterupdate,navegador)

    }

    return sectionupdateProfile;
}
