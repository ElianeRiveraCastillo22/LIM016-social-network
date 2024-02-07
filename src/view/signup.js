import { googleAuth } from '../firebase/auth/auth_google_signin_popup.js';
import { createUserWithEmailPsw } from '../firebase/auth/auth_signup_password.js';
import { locationSignIn } from '../helpers/locations.js';
import { mailValidator } from '../helpers/mailValidator.js';
import { setErrorInput } from '../helpers/setErrorInput.js';
import { validatePassword,strongPassword } from '../helpers/validatePassword.js';
import { validateseEmptyInputs } from '../helpers/validateseEmptyInputs.js';
import { showSignUp } from './templates/signUp.js';

export const SignUp = () => {

  const sectionSignUp = document.createElement('div');
  sectionSignUp.setAttribute('class', 'section--signup');
  sectionSignUp.innerHTML = showSignUp;

  const btnGoogle=sectionSignUp.querySelector('#google')
  const btnSignUp=sectionSignUp.querySelector('#btnSignUp')
  const btnGoToOption=sectionSignUp.querySelector('.goToOption')

  btnGoogle.addEventListener('click',googleAuth);
  btnGoToOption.addEventListener('click', locationSignIn);
  btnSignUp.addEventListener('click', (e)=>{

    e.preventDefault()

    let emailValue = sectionSignUp.querySelector('#email').value;
    let passwordValue = sectionSignUp.querySelector('#password').value;
    const inputEmail =sectionSignUp.querySelector('#email')
    const inputPassword =sectionSignUp.querySelector('#password')

    if (!strongPassword) {

      createUserWithEmailPsw(emailValue, passwordValue,inputEmail,inputPassword,sectionSignUp);

    }else if(!mailValidator(emailValue) && !strongPassword){

      setErrorInput(inputEmail, 'Correo electrónico invalido');
      validatePassword(passwordValue,inputPassword)

    }else if(!mailValidator(emailValue)){

      setErrorInput(inputEmail, 'Correo electrónico invalido');

    }else if(mailValidator(emailValue) && strongPassword){

      validatePassword(passwordValue,inputPassword)

    }else{

      validateseEmptyInputs(emailValue, passwordValue,inputEmail,inputPassword)

    }

  });

  return sectionSignUp;
};



