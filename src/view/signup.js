/* import {createUser} from '../firebase/auth/auth_signup_password.js';*/
import {googleAuth} from '../firebase/auth/auth_google_signin_popup.js';

import { createUserWithEmailPsw } from "../firebase/auth/auth_signup_password.js";
import { userActive } from '../firebase/auth/auth_state_listener.js';
import { showSignUp } from './templates/signUp.js';

export const backSignIn = () => {
  window.location.hash = '#/signIn';
};

export const SignUp = () => {

  const sectionSignup = document.createElement('div');
  sectionSignup.setAttribute('class', 'section--signup');
  sectionSignup.innerHTML = showSignUp;

  sectionSignup.querySelector('#google').addEventListener('click', googleAuth);


  sectionSignup.querySelector('#btnCheckIn').addEventListener('click', (e)=>{

    let email = sectionSignup.querySelector('#email').value;
    let password = sectionSignup.querySelector('#password').value;

    if(email == '' || password == '' || (email == '' && password == '')){
      alert("por favor ingrese sus datos 👨‍💻")
    }else{
      createUserWithEmailPsw(email, password);
    }
  });
  sectionSignup.querySelector('#SignIn').addEventListener('click', backSignIn);

  return sectionSignup;

};


/* export const registerUserNew = (e) => {
  e.preventDefault();

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  if (email === '' && password === '') {
    alert('Ups, debes completar el formulario');
  } else {
    createUser(email, password);
  };
}; */

export const showErrorRegister = (error) => {
  const setErrorInput = (input, errorMessage) => {
    const formControl = input.parentElement;
    console.log(formControl)
    const small = formControl.querySelector('small');

    small.innerText = errorMessage;
    formControl.classList.add('error');

    formControl.addEventListener('keyup', () => {
      formControl.classList.remove('error');
    });
  };
  /* console.log(error) */
  switch (error) {
    case 'auth/internal-error':
      setErrorInput(password, 'Ingrese contraseña');
      break;
    case 'auth/weak-password':
      console.log(password);
      setErrorInput(password, 'Debe tener mínimo 6 caracteres');
      break;
    case 'auth/missing-password':
      setErrorInput(password, 'Ingresa tu contraseña');
      break;
    case 'auth/missing-email':
      setErrorInput(email, 'Ingresa tu email');
      break;
    case 'auth/invalid-email':
      setErrorInput(email, 'Correo electrónico invalido');
      break;
    case 'auth/email-already-in-use':
      setErrorInput(email, 'El correo ya se encuentra registrado');
      break;

  }
};
