import { googleAuth } from '../firebase/auth/auth_google_signin_popup.js';
import {verifyWithEmailAndPassword} from '../firebase/auth/auth_signin_password.js';
import { showSignIn } from './templates/signIn.js';

export const SignIn = () => {

  const sectionSingin = document.createElement('div');
  sectionSingin.setAttribute('class', 'section--singnin');
  sectionSingin.innerHTML = showSignIn;

  sectionSingin.querySelector('#btnSignIn').addEventListener('click', (e)=>{
    const email = sectionSingin.querySelector('#email').value;
    const password = sectionSingin.querySelector('#password').value;
    verifyWithEmailAndPassword(email, password);
  });

  sectionSingin.querySelector('#btnSignUp').addEventListener('click', SignUp);
  sectionSingin.querySelector('#google').addEventListener('click',googleAuth);

  return sectionSingin;
};


const SignUp = () => {
  window.location.hash = '#/signUp';
};


export const showError = (error) => {
  console.error(error);

  const setErrorInput = (input, errorMessage) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    small.innerText = errorMessage;
    formControl.classList.add('error');

    formControl.addEventListener('keyup', () => {
      formControl.classList.remove('error');
    });
  };

  const typeError = () => {
    switch (error) {
      case 'auth/internal-error':
        setErrorInput(password, 'Ingrese contraseña');
        break;
      case 'auth/wrong-password':
        setErrorInput(password, 'Contraseña incorrecta');
        break;
      case 'auth/invalid-email':
        setErrorInput(email, 'Correo electrónico invalido');
        break;
      case 'auth/user-not-found':
        setErrorInput(email, 'No se encuentra registrado');
        break;
      case 'auth/too-many-requests':
        setErrorInput(password,
            'Toma un descanso y vuelve a intentarlo');
        break;
      case 'auth/invalid-credential':
        setErrorInput(password,'correo o contraseña incorrecta');
        setErrorInput(email,'correo o contraseña incorrecta');
      break;
      default:
        setErrorInput(email, 'Lo sentimos, se ha producido un error');
        break;
    }
  }; typeError();
};
