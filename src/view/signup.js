import { googleAuth } from '../firebase/auth/auth_google_signin_popup.js';
import { createUserWithEmailPsw } from '../firebase/auth/auth_signup_password.js';
import { locationSignIn } from '../helpers/locations.js';
import { showSignUp } from './templates/signUp.js';

export const SignUp = () => {

  const sectionSignUp = document.createElement('div');
  sectionSignUp.setAttribute('class', 'section--singnin');
  sectionSignUp.innerHTML = showSignUp;

  sectionSignUp.querySelector('#google').addEventListener('click',googleAuth);

  sectionSignUp.querySelector('#btnSignUp').addEventListener('click', (e)=>{

    let email = sectionSignUp.querySelector('#email').value;
    let password = sectionSignUp.querySelector('#password').value;

    if(email == '' || password == '' || (email == '' && password == '')){
      alert("por favor ingrese sus datos 👨‍💻")
    }else{
      createUserWithEmailPsw(email, password);
    }
  });

  sectionSignUp.querySelector('.goToOption').addEventListener('click', locationSignIn);


  return sectionSignUp;
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
