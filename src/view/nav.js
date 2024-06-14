import { signOutUser } from "../firebase/auth/auth_sign_out.js";
import { updatePublicationDocument } from "../firebase/firestore/update_document.js";
import { Account } from "../helpers/constructores/index.js";
import { locationHome, locationProfile, locationSignIn, locationUpdateUser } from "../helpers/locations.js";
import { templateLoader } from "./squeleton/index.js";
import { templateNav } from "./templates/nav.js"

export const Nav = () => {

	const navElemt = document.createElement('nav');
	navElemt.innerHTML = templateNav();
	const navSection = navElemt.querySelectorAll(".nav--section")
	const btnSingout = navElemt.querySelector("#signout")

	btnSingout.addEventListener('click',(e)=>{

		e.preventDefault()

		const userAccount = new Account({
			typeRegister:  localStorage.getItem('typeRegister'),
			uid: localStorage.getItem("uidUser"),
			activeSession: localStorage.getItem("activeSession")
		})

		/* const dialog = navElemt.parentElement.parentElement.querySelector(".popup__dialog")
		templateLoader(dialog,"Cerrando sesión...") */

		async function signOut () {
			try{

				await updatePublicationDocument(userAccount.uid, userAccount.typeRegister,{
					activeSession: false
				})

				localStorage.removeItem("activeSession")
				localStorage.removeItem("displayName")
				localStorage.removeItem("uidUser")
				localStorage.removeItem("photoURLUser")
				localStorage.removeItem("email")
				localStorage.removeItem("photoURLUser")
				localStorage.removeItem("registrationInTheFirstInstance")
				localStorage.removeItem("providerId")
				localStorage.removeItem("typeRegister")
				localStorage.removeItem("path")

				await signOutUser()

			}catch(error){

				console.log(error)

			}finally{

				locationSignIn()

			}

		} signOut()
	})


	const {hash}= location
	const currentHash=hash.split("/")[1]

	let htmlHashCurrent=navElemt.querySelector("#"+ currentHash)
	htmlHashCurrent.lastElementChild.classList.add("nav__location--txt")

	navSection.forEach((hashCurrent,indexCurrentHash) => {
		hashCurrent.addEventListener("click",()=>{

			if(indexCurrentHash==0) locationProfile()
			else if(indexCurrentHash==1) locationHome()
			else if(indexCurrentHash==2) locationUpdateUser()

		})

	});

	return navElemt;
};

