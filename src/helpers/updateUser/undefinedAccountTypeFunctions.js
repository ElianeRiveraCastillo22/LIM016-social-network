import { listensToTheActiveUser } from "../../firebase/auth/auth_state_listener.js"
import { addRecordToFirestore } from "../../firebase/firestore/add_document.js"
import { templateTypeUndefine } from "../../view/templates/updateUser_cases.js"
import { Account } from "../constructores/index.js"
import { locationHome } from "../locations.js"
import { updateRegistrationDocumentData } from "./updateRegistrationDocumentData.js"

export function undefinedAccountTypeFunctions(containerInputsForm,btnRegisterupdate,imgUser,navegador) {

    containerInputsForm.innerHTML = templateTypeUndefine()

    const containerGglOptionsOptions = containerInputsForm.querySelectorAll(".containerGglOptions__option")
    const recordTypes  = containerInputsForm.querySelectorAll(".updateGglRegister__type label")
    const inputName = containerInputsForm.querySelector(".updateProfile__name")
    const inputNamePoint = containerInputsForm.querySelector(".updateProfile__namePoint")
    const inputDescription = containerInputsForm.querySelector(".updateProfile__description")

    function setDefaults() {

        inputName.value = localStorage.getItem("displayName")
        inputNamePoint.value = localStorage.getItem("displayName")
        imgUser.src= localStorage.getItem("photoURLUser")

    }

    async function getActiveUser() {

        const userActive = await listensToTheActiveUser()

        if(userActive !== undefined){
            const { displayName, uid, photoURL, email } = userActive

            if(displayName || photoURL){
                localStorage.setItem("displayName", displayName)
                localStorage.setItem("uidUser", uid)
                localStorage.setItem("photoURLUser", photoURL)
                localStorage.setItem("email", email)
            }
            setDefaults()
        }
    }
    getActiveUser()

    setDefaults()

    recordTypes.forEach((elementrecordType)=>{
		elementrecordType.addEventListener("click", ()=>{

			let recordtype = elementrecordType.dataset.recordtype

			function changeClassesToShowTheFormOption(indexUser, indexPoint) {
				if(elementrecordType.classList.contains("updateGglRegister--noselected")){

					elementrecordType.classList.remove("updateGglRegister--noselected")
					elementrecordType.classList.add("updateGglRegister--selected")
					recordTypes[indexPoint].classList.remove("updateGglRegister--selected")
					recordTypes[indexPoint].classList.add("updateGglRegister--noselected")

					containerGglOptionsOptions[indexUser].classList.remove("containerGglOptions__hidden")
					containerGglOptionsOptions[indexPoint].classList.add("containerGglOptions__hidden")

				}
			}

			if(recordtype == "user-account") changeClassesToShowTheFormOption(0, 1)
			if(recordtype == "point-account") changeClassesToShowTheFormOption(1, 0)

		})
    })

    btnRegisterupdate.addEventListener("click", (e)=>{

		e.preventDefault()

		const selectedRecord = Object.values(recordTypes).find(elementrecordType => elementrecordType.classList.contains("updateGglRegister--selected")).dataset.recordtype
		let newName
		let description = inputDescription.value
		selectedRecord == "user-account" ? newName = inputName.value : newName = inputNamePoint.value

		const registryData  = new Account({
			displayName: newName,
			typeRegister: selectedRecord,
			photoURLUser: localStorage.getItem("photoURLUser"),
			email: localStorage.getItem("email"),
			uid: localStorage.getItem("uidUser"),
			description: description,
			activeSession: true,
			publications_made: [],
			registrationInTheFirstInstance: true,
		})

		localStorage.setItem("displayName", registryData.displayName)
		localStorage.setItem("typeRegister", registryData.typeRegister)
		localStorage.setItem("activeSession", registryData.activeSession)
		localStorage.setItem("registrationInTheFirstInstance", registryData.registrationInTheFirstInstance)

		async function createRegistrationDataInFirestore() {

			if(selectedRecord == "user-account"){

				updateRegistrationDocumentData(registryData.displayName)
				addRecordToFirestore(selectedRecord, registryData.uid, {
					displayName: registryData.displayName,
					typeRegister: registryData.typeRegister,
					photoURLUser: registryData.photoURLUser,
					email: registryData.email,
					uid: registryData.uid,
					publications_made: registryData.publications_made,
					activeSession: registryData.activeSession,
					registrationInTheFirstInstance: registryData.registrationInTheFirstInstance
				})

			}

			if(selectedRecord == "point-account"){

				localStorage.setItem("description", registryData.description)

				updateRegistrationDocumentData(registryData.displayName)
				addRecordToFirestore(selectedRecord, registryData.uid, {
					displayName: registryData.displayName,
					typeRegister: registryData.typeRegister,
					photoURLUser: registryData.photoURLUser,
					email: registryData.email,
					uid: registryData.uid,
					publications_made: registryData.publications_made,
					description: registryData.description,
					activeSession: registryData.activeSession,
					registrationInTheFirstInstance: registryData.registrationInTheFirstInstance
				})

			}
		} createRegistrationDataInFirestore()

		navegador.style.display="flex"
		locationHome()
    })
}