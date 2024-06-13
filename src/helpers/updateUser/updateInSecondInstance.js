import { updateAuthenticationPassword } from "../../firebase/auth/auth_update_password.js";
import { getRegistrationDocument } from "../../firebase/firestore/get_document.js";
import { updatePublicationDocument, updateRegistrationDoc } from "../../firebase/firestore/update_document.js";
import { Account } from "../constructores/index.js";
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

function updatePassword(btnsSave,inputPassword){

    btnsSave.forEach((btnSave) => {
        btnSave.addEventListener("click", (e)=>{

            e.preventDefault()


            if(btnSave.classList.contains("btn--active")){

                if(btnSave.previousElementSibling == inputPassword){

                    function getASecureRandomPassword() {
                        return inputPassword.value
                    }

                    async function saveNewPassword() {

                        try{

                            await updateAuthenticationPassword(getASecureRandomPassword())

                        }catch(error){

                            console.log(error)

                        }

                    } saveNewPassword()
                }
            }
        })
    });
}

function updateNameOrDescription(inputElement, btnsSave) {
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

                        async function updateNameDocument() {

                            try{
                                await updateRegistrationDocumentData(getTheName())
                                await updateRegistrationDoc(localLogDataStorage.uid,localLogDataStorage.typeRegister,{
                                    displayName: getTheName()
                                })
                                const publicationType = localLogDataStorage.typeRegister.split("-")[0] + "-publication"
                                const registryData = await getRegistrationDocument(localLogDataStorage.typeRegister, localLogDataStorage.uid)

                                registryData.publications_made.forEach((idpublication)=>{

                                    async function updateEachPublicationDocument (){
                                        try{
                                            await updatePublicationDocument(idpublication,publicationType,{
                                                publicationOwner:getTheName()
                                            })
                                            localStorage.setItem("displayName",getTheName())

                                        }catch(error){

                                            console.log(error)

                                        }

                                    } updateEachPublicationDocument()
                                })

                            }catch(error){

                                console.log(error)

                            }

                        } updateNameDocument()

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

                        async function updateNameDocument() {

                            try{

                                await updateRegistrationDoc(localLogDataStorage.uid,localLogDataStorage.typeRegister,{
                                    description: getDescription()
                                })

                            }catch(error){

                                console.log(error)

                            }

                        } updateNameDocument()

                    }
                }
            }
        })
    })
}

export {
    closeTheListOfUnclickedDetails,
    showWarningMessage,
    activateButtonToUpdate,
    enableSavePasswordButton,
    updatePassword,
    updateNameOrDescription,
    updateDescription
}