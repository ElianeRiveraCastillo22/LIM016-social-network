import { updateAuthenticationPassword } from "../../firebase/auth/auth_update_password.js";
import { getRegistrationDocument } from "../../firebase/firestore/get_document.js";
import { updatePublicationDocument, updateRegistrationDoc } from "../../firebase/firestore/update_document.js";
import { templateLoader } from "../../view/squeleton/index.js";
import { popupMessaje } from "../../view/templates/popupMessaje.js";
import { placeRegistrationTemplate, userRegistrationTemplate } from "../../view/templates/updateUser_cases.js";
import { Account } from "../constructores/index.js";
import { closePopup } from "../popupMessaje.js";
import { resizeSpaceBetweenHeaderAndMain } from "../resizeSpaceBetweenHeaderAndMain.js";
import { updateRegistrationDocumentData } from "./updateRegistrationDocumentData.js";

function closeTheListOfUnclickedDetails(containerInputsForm) {
    const detailNames = containerInputsForm.querySelectorAll(".containerForm__fieldToEdit")
    const details = containerInputsForm.querySelectorAll(".containerForm__details")
    detailNames.forEach(detailName => {
        detailName.addEventListener("click", ()=>{

            const listOfOtherOpenDetails= Object.values(details).filter(detail=>detail.hasAttribute("open"))

            if(!listOfOtherOpenDetails.length==0){
                listOfOtherOpenDetails.forEach(otherDetails=>{
                    otherDetails.removeAttribute("open")
                })
            }
        })
    });
}

function showWarningMessage(containerInputsForm,fieldReceivingTheValue,smallElement,messaje) {
    const elementMessaje = containerInputsForm.querySelector(".elementMessaje")
    if(!elementMessaje){
        smallElement.innerText = messaje
        fieldReceivingTheValue.before(smallElement)
    }
}

function activateButtonToUpdate(fieldReceivingTheValue, containerInputsForm, emptyValueMessage, messageOfEqualValue) {


    fieldReceivingTheValue.addEventListener("keyup",()=>{

        const currentValue = localStorage.getItem("displayName")
        const newValue = fieldReceivingTheValue.value
        const btnSave = fieldReceivingTheValue.nextElementSibling

        const smallElement = document.createElement("small")
        smallElement.classList.add("elementMessaje")

        function changeButtonStatus(remove,add) {
            btnSave.classList.remove(remove)
            btnSave.classList.add(add)
        }

        if(newValue){
            if(currentValue == newValue){

                showWarningMessage(containerInputsForm,fieldReceivingTheValue,smallElement,messageOfEqualValue)
                changeButtonStatus("btn--active","btn--disebled")

            } else{

                function removeWarningMessage () {
                    const elementMessaje = containerInputsForm.querySelector(".elementMessaje")
                    if(elementMessaje) elementMessaje.remove()
                } removeWarningMessage()

                changeButtonStatus("btn--disebled","btn--active")

            }
        }else{

            showWarningMessage(containerInputsForm,fieldReceivingTheValue,smallElement,emptyValueMessage)
            changeButtonStatus("btn--active","btn--disebled")

        }
    })
}

function enableSavePasswordButton(inputPassword,containerInputsForm, message) {

    inputPassword.addEventListener("keyup", ()=>{
        const btnSave = inputPassword.nextElementSibling

        const smallElement = document.createElement("small")
        smallElement.classList.add("elementMessaje")

        function changeButtonStatus(remove,add) {
            btnSave.classList.remove(remove)
            btnSave.classList.add(add)
        }

        if(inputPassword.value.length >= 6){
            function removeWarningMessage () {
                const elementMessaje = containerInputsForm.querySelector(".elementMessaje")
                if(elementMessaje) elementMessaje.remove()
            } removeWarningMessage()
            changeButtonStatus("btn--disebled", "btn--active")
        }else{
            showWarningMessage(containerInputsForm,inputPassword,smallElement, message)
            changeButtonStatus("btn--active", "btn--disebled")
        }

    })
}

function updatePassword(btnsSave, inputPassword, sectionupdateProfile){

    btnsSave.forEach((btnSave) => {
        btnSave.addEventListener("click", (e)=>{

            e.preventDefault()

            if(btnSave.classList.contains("btn--active")){

                if(btnSave.previousElementSibling == inputPassword){

                    function getASecureRandomPassword() {
                        return inputPassword.value
                    }

                    const popupUpdate = sectionupdateProfile.querySelector(".popup__dialog")

                    popupUpdate.innerHTML = popupMessaje("¿Seguro que quiere actualizar su contraseña? 🤔", "Actualizar")
                    popupUpdate.show()
                    popupUpdate.classList.add("popup__dialog--center")

                    const popupBtnCancel = sectionupdateProfile.querySelector(".popupBox__btn--cancel")
                    const popupBtnUpdate = sectionupdateProfile.querySelector(".popupBox__btn--Actualizar")

                    popupBtnUpdate.addEventListener("click", ()=>{

                        closePopup(popupUpdate)

                        templateLoader(sectionupdateProfile,"Actualizando contraseña")
                        const popupLoader = sectionupdateProfile.querySelector(".popupLoader")
                        const msjLoader = sectionupdateProfile.querySelector(".popupLoader__msj")

                        async function saveNewPassword() {

                            try{

                                await updateAuthenticationPassword(getASecureRandomPassword())

                            }catch(error){

                                console.log(error)

                            }finally{

                                msjLoader.innerText ="Actualizado ✔"
                                popupLoader.remove()

                            }

                        } saveNewPassword()
                    })

                    popupBtnCancel.addEventListener("click",()=>{

                        closePopup(popupUpdate)

                    })
                }
            }
        })
    });
}

function updateName(inputElement, btnsSave, sectionupdateProfile) {
    btnsSave.forEach((btnSave) => {
        btnSave.addEventListener("click", (e)=>{

            if(btnSave.classList.contains("btn--active")){

                if(btnSave.previousElementSibling == inputElement){

                    const fieldName = inputElement.dataset.nameofupdatingfield

                    function getTheName() {
                        return inputElement.value
                    }

                    const localLogDataStorage = new Account({
                        typeRegister:localStorage.getItem("typeRegister"),
                        uid: localStorage.getItem("uidUser"),
                        displayName: localStorage.getItem("displayName")
                    })

                    if(fieldName == "displayName"){

                        const popupUpdate = sectionupdateProfile.querySelector(".popup__dialog")

                        popupUpdate.innerHTML = popupMessaje("¿Seguro que quiere actualizar su nombre? 🤔", "Actualizar")
                        popupUpdate.show()
                        popupUpdate.classList.add("popup__dialog--center")

                        const popupBtnCancel = sectionupdateProfile.querySelector(".popupBox__btn--cancel")
                        const popupBtnUpdate = sectionupdateProfile.querySelector(".popupBox__btn--Actualizar")

                        popupBtnUpdate.addEventListener("click", ()=>{

                            closePopup(popupUpdate)

                            templateLoader(sectionupdateProfile,"Actualizando nombre...")
                            const popupLoader = sectionupdateProfile.querySelector(".popupLoader")
                            const msjLoader = sectionupdateProfile.querySelector(".popupLoader__msj")

                            async function updateNameDocument() {

                                try {
                                    await updateRegistrationDocumentData(getTheName())
                                    await updateRegistrationDoc(localLogDataStorage.uid,localLogDataStorage.typeRegister,{
                                        displayName: getTheName()
                                    })

                                    localStorage.setItem("displayName",getTheName())

                                    const publicationType = localLogDataStorage.typeRegister.split("-")[0] + "-publication"
                                    const registryData = await getRegistrationDocument(localLogDataStorage.typeRegister, localLogDataStorage.uid)

                                    registryData.publications_made.forEach((idpublication)=>{

                                        async function updateEachPublicationDocument (){

                                            try{

                                                await updatePublicationDocument(idpublication,publicationType,{
                                                    publicationOwner:getTheName()
                                                })

                                            }catch(error){

                                                console.log(error)

                                            }

                                        } updateEachPublicationDocument()
                                    })

                                }catch(error) {

                                    console.log(error)

                                }finally {

                                    msjLoader.innerText ="Actualizado ✔"
                                    popupLoader.remove()

                                }

                            } updateNameDocument()

                        })

                        popupBtnCancel.addEventListener("click", ()=>{
                            closePopup(popupUpdate)
                        })
                    }
                }
            }
        })
    })
}
function updateDescription(inputElement, btnsSave) {
    btnsSave.forEach((btnSave) => {
        btnSave.addEventListener("click", (e)=>{

            if(btnSave.classList.contains("btn--active")){

                if(btnSave.previousElementSibling == inputElement){

                    const fieldName = inputElement.dataset.nameofupdatingfield

                    function getDescription() {
                        return inputElement.value
                    }

                    const localLogDataStorage = new Account({
                        typeRegister:localStorage.getItem("typeRegister"),
                        uid: localStorage.getItem("uidUser"),
                    })

                    if(fieldName == "description"){

                        const popupUpdate = sectionupdateProfile.querySelector(".popup__dialog")

                        popupUpdate.innerHTML = popupMessaje("¿Seguro que quiere actualizar su descripcion? 🤔", "Actualizar")
                        popupUpdate.show()
                        popupUpdate.classList.add("popup__dialog--center")

                        const popupBtnCancel = sectionupdateProfile.querySelector(".popupBox__btn--cancel")
                        const popupBtnUpdate = sectionupdateProfile.querySelector(".popupBox__btn--Actulizar")

                        popupBtnUpdate.addEventListener("click", ()=>{

                            closePopup(popupUpdate)

                            templateLoader(sectionupdateProfile,"Actualizando descripción")
                            const popupLoader = sectionupdateProfile.querySelector(".popupLoader")
                            const msjLoader = sectionupdateProfile.querySelector(".popupLoader__msj")

                            async function updateNameDocument() {

                                try{

                                    await updateRegistrationDoc(localLogDataStorage.uid,localLogDataStorage.typeRegister,{
                                        description: getDescription()
                                    })

                                }catch(error){

                                    console.log(error)

                                }finally{

                                    msjLoader.innerText ="Actualizado ✔"
                                    popupLoader.remove()

                                }

                            } updateNameDocument()

                        })

                        popupBtnCancel.addEventListener("click", ()=>{
                            closePopup(popupUpdate)
                        })



                    }
                }
            }
        })
    })
}

function updateInSecondInstance(sectionupdateProfile,containerInputsForm,btnRegisterupdate,imgUser){

    btnRegisterupdate.style.display="none"
    sectionupdateProfile.style.position="absolute"
    const heightHead=document.querySelector("#navegador");
    resizeSpaceBetweenHeaderAndMain(sectionupdateProfile,heightHead)
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

        updatePassword(btnsSave, inputPassword, sectionupdateProfile)
        updateName(inputName, btnsSave, sectionupdateProfile)


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
        console.log(containerInputsForm)
        updatePassword(btnsSave, inputPassword, sectionupdateProfile)
        updateName(inputName, btnsSave, sectionupdateProfile)
        updateDescription(inputDescription, btnsSave)
    }

}


export {
    closeTheListOfUnclickedDetails,
    showWarningMessage,
    activateButtonToUpdate,
    enableSavePasswordButton,
    updatePassword,
    updateName,
    updateDescription,
    updateInSecondInstance
}