import {googleAuth} from '../firebase/auth/auth_google_signin_popup.js';
import { verifyWithEmailAndPassword } from '../firebase/auth/auth_signin_password.js';

import { locationSignUp } from '../helpers/locations.js';
import { mailValidator } from '../helpers/mailValidator.js';
import { setErrorInput } from '../helpers/setErrorInput.js';
import { validateseEmptyInputs } from '../helpers/validateseEmptyInputs.js';
import { showSignIn } from './templates/signIn.js';

export const SignIn = () => {

  const sectionSignIn = document.createElement('div');
  sectionSignIn.setAttribute('class', 'section--signup');
  sectionSignIn.innerHTML = showSignIn;

  const btnGoogle=sectionSignIn.querySelector('#google')
  const btnSignIn=sectionSignIn.querySelector('#btnSignIn')
  const btnGoToOption=sectionSignIn.querySelector('.goToOption')

  btnGoogle.addEventListener('click', googleAuth);
  btnGoToOption.addEventListener('click', locationSignUp);
  btnSignIn.addEventListener('click', (e)=>{

    e.preventDefault()

    let emailValue = sectionSignIn.querySelector('#email').value;
    let passwordValue = sectionSignIn.querySelector('#password').value;
    const inputEmail =sectionSignIn.querySelector('#email')
    const inputPassword =sectionSignIn.querySelector('#password')

    if (mailValidator(emailValue)) {

      verifyWithEmailAndPassword(emailValue, passwordValue,inputEmail,inputPassword);

    } else{

      validateseEmptyInputs(emailValue,passwordValue,inputEmail,inputPassword)
      setErrorInput(inputEmail, 'Correo electrónico invalido');

    }

  });

  return sectionSignIn;

};