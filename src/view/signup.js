import { googleAuth } from '../firebase/auth/auth_google_signin_popup.js';
import { createUserWithEmailPsw } from '../firebase/auth/auth_signup_password.js';
import { locationHome, locationSignIn, locationUpdateUser } from '../helpers/locations.js';
import { emailValidator } from '../helpers/emailValidator.js';
import { validatePassword } from '../helpers/validatePassword.js';
import { showSignUp } from './templates/signUp.js';
import { Account } from '../helpers/constructores/index.js';
import { signInPopUp } from '../helpers/signInPopUp.js';
import { getPublished } from '../firebase/firestore/get_document.js';
import { threePointTemplates } from './squeleton/index.js';
import { addRecordToFirestore } from '../firebase/firestore/add_document.js';

export const SignUp = () => {

	const sectionSignUp = document.createElement('div');
	sectionSignUp.setAttribute('class', 'section--signup');
	sectionSignUp.innerHTML = showSignUp;

	const btnSignUp=sectionSignUp.querySelector('#btnSignUp')
	const btnToLogin =sectionSignUp.querySelector('.goToOption')
	const warningTxt= sectionSignUp.querySelector('.typeregister__warningTxt')
	const registrationOptions = sectionSignUp.querySelectorAll('.optionRegister')
	const googleLoginBtn= sectionSignUp.querySelector('.loginInGoogle')
	const inputEmail =sectionSignUp.querySelector('#email')
	const inputPassword =sectionSignUp.querySelector('#password')
	const boxRegisterOptions = sectionSignUp.querySelector('.form__radios')
	const loginInGoogleLoader = sectionSignUp.querySelector(".loginInGoogle__loader")

	async function showGooglePopup() {
		try{

			loginInGoogleLoader.innerHTML = threePointTemplates("btnloader__dot--btnGoogle")
			googleLoginBtn.classList.add("loginInGoogle--showloader")
			const registrationData = await googleAuth()

			async function getFirebaseRegistration() {
				try{

					const documentExists = await getPublished(registrationData.user.uid, "user-account")

					if(documentExists){

						localStorage.setItem("photoURLUser", documentExists.photoURLUser)
						localStorage.setItem("uidUser", documentExists.uid)
						localStorage.setItem("displayName", documentExists.displayName)
						localStorage.setItem("typeRegister", documentExists.typeRegister)
						localStorage.setItem("activeSession", true)
						locationHome()

					}else{

						localStorage.setItem("providerId", registrationData.providerId)
						locationUpdateUser()

					}
				}catch(error){

					console.log(error)

				}
			} getFirebaseRegistration()

		}catch(error){

			console.log(error)

		}finally{

			googleLoginBtn.classList.remove("loginInGoogle--showloader")
			loginInGoogleLoader.innerHTML= ""

		}
	}

	googleLoginBtn.addEventListener('click', showGooglePopup)
	btnToLogin .addEventListener('click', locationSignIn);

	registrationOptions.forEach((option) => {
		option.addEventListener("click",()=>{

			warningTxt.innerText =""

		})
	});

	btnSignUp.addEventListener('click', (e)=>{

		e.preventDefault()
		let fieldsToFillIn = [inputEmail, inputPassword, boxRegisterOptions]

		function showRecordTypeErrorMessage() {

			const didNotChooseHowToRegister=Object.values(registrationOptions).every(registrationOption => (!registrationOption.checked))

			if(didNotChooseHowToRegister){

				warningTxt.innerText ="Elije como registrarte"
				boxRegisterOptions.classList.remove("completed")

			}else boxRegisterOptions.classList.add("completed")


		}
		function createAccount() {

			const allFieldsAreComplete = fieldsToFillIn.every(fields => fields.classList.contains("completed"))

			if(allFieldsAreComplete){

				function accounTypeChosen(){
					let accountType
					registrationOptions.forEach((option) => {
						if(option.checked) accountType = option.dataset.recordtype
					})
					return accountType
				}

				const registryData = new Account({
					typeRegister: accounTypeChosen(),
					email: inputEmail.value,
					password:inputPassword.value
				})

				async function createAccount() {

					const userCredential = await createUserWithEmailPsw(registryData)

					if(userCredential) signInPopUp(sectionSignUp)
					registryData.uid = userCredential.user.uid

					await addRecordToFirestore(registryData.typeRegister, registryData.uid, {
						typeRegister: registryData.typeRegister,
						email: registryData.email,
						uid: registryData.uid
					})

				} createAccount()
			}
		}

		emailValidator(inputEmail)
		validatePassword(inputPassword)
		showRecordTypeErrorMessage()
		createAccount()

	});

  return sectionSignUp;
};



