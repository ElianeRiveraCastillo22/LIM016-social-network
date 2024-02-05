import { verificationPopUp } from "../view/templates/verificationPopUp.js"
import { locationSignIn } from "./locations.js"

export const signInPopUp = (sectionSignUp)=>{
    sectionSignUp.innerHTML+=verificationPopUp

    const btnpopup= sectionSignUp.querySelector(".btnpopup__signUp")
    const signUpPopup = sectionSignUp.querySelector(".signUp__popup")

    btnpopup.addEventListener("click",()=>{
      signUpPopup.close()
      signUpPopup.classList.add("closePopupSignIn")
      /* locationSignIn() */
    })

    return sectionSignUp
}