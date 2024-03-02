import { googleAuth } from '../firebase/auth/auth_google_signin_popup.js';
import { createUserWithEmailPsw } from '../firebase/auth/auth_signup_password.js';
import { locationSignIn } from '../helpers/locations.js';
import { mailValidator } from '../helpers/mailValidator.js';
import { setErrorInput } from '../helpers/setErrorInput.js';
import { validatePassword } from '../helpers/validatePassword.js';
import { validateseEmptyInputs } from '../helpers/validateseEmptyInputs.js';
import { showSignUp } from './templates/signUp.js';

export const SignUp = () => {

  const sectionSignUp = document.createElement('div');
  sectionSignUp.setAttribute('class', 'section--signup');
  sectionSignUp.innerHTML = showSignUp;

  const btnGoogle=sectionSignUp.querySelector('#google')
  const btnSignUp=sectionSignUp.querySelector('#btnSignUp')
  const btnGoToOption=sectionSignUp.querySelector('.goToOption')
  const warningTxt= sectionSignUp.querySelector('.typeregister__warningTxt')
  const optionRegister = sectionSignUp.querySelectorAll('.optionRegister')

  let check=false
  let valueOptionRegister=undefined
  btnGoogle.addEventListener('click',googleAuth);

  btnGoToOption.addEventListener('click', locationSignIn);

  optionRegister.forEach((option) => {
    option.addEventListener("click",(e)=>{
      console.log(e.target.value)
      check=true
      warningTxt.innerText =""
      valueOptionRegister=e.target.value
    })
  });

  btnSignUp.addEventListener('click', (e)=>{

    e.preventDefault()

    let emailValue = sectionSignUp.querySelector('#email').value;
    let passwordValue = sectionSignUp.querySelector('#password').value;
    const inputEmail =sectionSignUp.querySelector('#email')
    const inputPassword =sectionSignUp.querySelector('#password')

    validatePassword(passwordValue,inputPassword)
 
      if(!mailValidator(emailValue)){
        setErrorInput(inputEmail, 'Correo electrónico invalido');
      }else if(!check){
        warningTxt.innerText ="Elije como registrarte"
      }else{
        validateseEmptyInputs(emailValue, passwordValue,inputEmail,inputPassword)
        if(check){
          createUserWithEmailPsw(emailValue, passwordValue,inputEmail,inputPassword,sectionSignUp,valueOptionRegister);
        }
      }
  });

  return sectionSignUp;
};



