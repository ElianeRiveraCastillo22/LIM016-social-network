import { verificationPopUp } from "../view/templates/verificationPopUp.js"
import { locationSignIn } from "./locations.js"

export const signInPopUp = (sectionSignUp)=>{

    const btnpopup= sectionSignUp.querySelector(".btnpopup__signUp")
    const signUpPopup = sectionSignUp.querySelector(".signUp__popup")

    signUpPopup.show();
    signUpPopup.classList.add("signUp__popup--open");
    signUpPopup.classList.remove("signUp__popup--close");

    btnpopup.addEventListener("click",()=>{

		signUpPopup.close();
		signUpPopup.classList.remove("signUp__popup--open");
		signUpPopup.classList.add("signUp__popup--close");

    })

    return sectionSignUp
}