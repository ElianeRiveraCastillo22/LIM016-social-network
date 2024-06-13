import {googleAuth} from '../firebase/auth/auth_google_signin_popup.js';
import { verifyWithEmailAndPassword } from '../firebase/auth/auth_signin_password.js';
import { locationHome, locationSignUp, locationUpdateUser } from '../helpers/locations.js';
import { emailValidator } from '../helpers/emailValidator.js';
import { showSignIn } from './templates/signIn.js';
import { getPublished, getRegistrationDocument } from '../firebase/firestore/get_document.js';
import { threePointTemplates } from './squeleton/index.js';
import { validatePassword } from '../helpers/validatePassword.js';
import { signInPopUp } from '../helpers/signInPopUp.js';
import { updatePhotoURL } from '../helpers/updatePhotoURL.js';
import { updateRegistrationDoc } from '../firebase/firestore/update_document.js';
import { getFirebaseRegistration } from '../helpers/updateUser/getFirebaseRegistration.js';

export const SignIn = () => {

	const sectionSignIn = document.createElement('div');
	sectionSignIn.setAttribute('class', 'section--signup');
	sectionSignIn.innerHTML = showSignIn;

	const btnGoogle=sectionSignIn.querySelector('#google')
	const googleLoginBtn= sectionSignIn.querySelector('.loginInGoogle')
	const btnSignIn=sectionSignIn.querySelector('#btnSignIn')
	const btnToSignup=sectionSignIn.querySelector('.goToOption')
	const loginInGoogleLoader = sectionSignIn.querySelector(".loginInGoogle__loader")
	const inputEmail =sectionSignIn.querySelector('#email')
	const inputPassword =sectionSignIn.querySelector('#password')

	async function showGooglePopup() {

		try{

			loginInGoogleLoader.innerHTML = threePointTemplates("btnloader__dot--btnGoogle")
			googleLoginBtn.classList.add("loginInGoogle--showloader")

			const registrationData = await googleAuth()
			localStorage.setItem("providerId", registrationData.providerId)
			getFirebaseRegistration(registrationData)

		} catch(error){

			console.log(error)

		} finally{

			googleLoginBtn.classList.remove("loginInGoogle--showloader")
			loginInGoogleLoader.innerHTML= ""

		}
	}

	btnGoogle.addEventListener('click',showGooglePopup);
	btnToSignup.addEventListener('click', locationSignUp);
	btnSignIn.addEventListener('click', (e)=>{

		e.preventDefault()
		btnSignIn.innerHTML += threePointTemplates("btnloader__dot--btnSignin")
		let fieldsToFillIn = [inputEmail, inputPassword]

		emailValidator(inputEmail)
		validatePassword(inputPassword)

		function login() {

			const allFieldsAreComplete = fieldsToFillIn.every(fields => fields.classList.contains("completed"))

			if(allFieldsAreComplete){

				const accountData = {
					email: inputEmail,
					password: inputPassword
				}

				async function createAccount() {
					try{

						const userCredential = await verifyWithEmailAndPassword(accountData)

						if(userCredential.user.emailVerified){

							const userRegistrationDocument = await getRegistrationDocument("user-account", userCredential.user.uid)
							const pointRegistrationDocument = await getRegistrationDocument("point-account", userCredential.user.uid)

							function savesTheRegistrationAccountType() {

								function saveUserDataInStorage(RegistrationDocument) {

									localStorage.setItem("photoURLUser", RegistrationDocument.photoURLUser)
									localStorage.setItem("uidUser", RegistrationDocument.uid)
									localStorage.setItem("displayName", RegistrationDocument.displayName)
									localStorage.setItem("activeSession", true)
									localStorage.setItem("registrationInTheFirstInstance", RegistrationDocument.registrationInTheFirstInstance)

									updateRegistrationDoc(RegistrationDocument.uid, RegistrationDocument.typeRegister, {
										activeSession:true
									})
								}

								if(userRegistrationDocument){
									localStorage.setItem("typeRegister", userRegistrationDocument.typeRegister)
									if(userRegistrationDocument.displayName) saveUserDataInStorage(userRegistrationDocument)
								}

								if(pointRegistrationDocument){
									localStorage.setItem("typeRegister", pointRegistrationDocument.typeRegister)
									if(pointRegistrationDocument.displayName) saveUserDataInStorage(pointRegistrationDocument)
								}

							} savesTheRegistrationAccountType()


							if(userCredential.user.displayName == null){

								localStorage.setItem("photoURLUser", updatePhotoURL(userCredential.user.photoURL))
								localStorage.setItem("email", userCredential.user.email)
								localStorage.setItem("uidUser", userCredential.user.uid)
								localStorage.setItem("providerId", "emailAndPassword")
								locationUpdateUser()

							} else locationHome()


						} else signInPopUp(sectionSignIn)

					} catch(error){

						console.log(error)

					} finally{

						const btnLoader = sectionSignIn.querySelector(".btn__loader")
						btnLoader.remove()

					}
				}
				createAccount()
			}
		} login()
	});
	return sectionSignIn;
};

