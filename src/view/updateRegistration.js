import { activateButtonToUpdate, enableSavePasswordButton, showWarningMessage } from "../helpers/updateUser/activateButtonToUpdate.js";
import { functionsOfTheChosenRecordType } from "../helpers/updateUser/functionsOfTheChosenRecordType.js";
import { undefinedAccountTypeFunctions } from "../helpers/updateUser/undefinedAccountTypeFunctions.js";
import { closeTheListOfUnclickedDetails } from "../helpers/updateUser/updateInSecondInstance.js";
import { validatePassword } from "../helpers/validatePassword.js";
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
            imgUser.src = localStorage.getItem("photoURLUser")

            if(localStorage.getItem("typeRegister") == "user-account"){
                containerInputsForm.innerHTML = userRegistrationTemplate

                const inputName = containerInputsForm.querySelector(".updateProfile__name")
                const inputPassword = containerInputsForm.querySelector(".updateProfile__password")
                const btnsSave = containerInputsForm.querySelectorAll(".btnSave")

                function showRegistryValues() {
                    inputName.value = localStorage.getItem("displayName")
                } showRegistryValues()

                closeTheListOfUnclickedDetails(containerInputsForm)

                activateButtonToUpdate(
                    inputName,
                    containerInputsForm,
                    "Ingresa un nombre para poder actualizar su nombre de usuario 🙏",
                    "Es el mismo nombre 😯, ingresa uno nuevo 🙏"
                )

                enableSavePasswordButton(
                    inputPassword,
                    containerInputsForm,
                     "Ingresa una contraseña con más de 5 caracteres 🧐🏋️‍♀️"
                )

                btnsSave.forEach((btnSave) => {
                    btnSave.addEventListener("click", ()=>{


                    })
                });
            }

            if(localStorage.getItem("typeRegister") == "point-account"){

                containerInputsForm.innerHTML = placeRegistrationTemplate

                const inputName = containerInputsForm.querySelector(".updateProfile__name")
                const inputPassword = containerInputsForm.querySelector(".updateProfile__password")
                const inputDescription = containerInputsForm.querySelector(".updateProfile__description")

                function showRegistryValues() {
                    inputName.value = localStorage.getItem("displayName")
                    inputDescription.value = localStorage.getItem("description")
                } showRegistryValues()

                closeTheListOfUnclickedDetails(containerInputsForm)

                activateButtonToUpdate(
                    inputName,
                    containerInputsForm,
                    "Ingresa un nombre para poder actualizar su nombre de usuario 🙏",
                    "Es el mismo nombre 😯, ingresa uno nuevo 🙏"
                )

                activateButtonToUpdate(
                    inputDescription,
                    containerInputsForm,
                    "Ingrese una descripcion para poder actualizar 🙏",
                    "Es la misma descripción que tienes, ingresa uno nuevo 🙏"
                )

                enableSavePasswordButton(
                    inputPassword,
                    containerInputsForm,
                     "Ingresa una contraseña con más de 5 caracteres 🧐🏋️‍♀️"
                )
            }
        } updateInSecondInstance(containerInputsForm,btnRegisterupdate)

    }else{

        const navegador = document.querySelector("#navegador")
        navegador.style.display="none"

        if(localStorage.getItem("providerId") == "google.com") undefinedAccountTypeFunctions(containerInputsForm,btnRegisterupdate,imgUser,navegador)
        else functionsOfTheChosenRecordType(containerInputsForm,btnRegisterupdate,navegador)

    }

    return sectionupdateProfile;
}
