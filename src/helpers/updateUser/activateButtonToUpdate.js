
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
export{
    showWarningMessage,
    activateButtonToUpdate,
    enableSavePasswordButton
}