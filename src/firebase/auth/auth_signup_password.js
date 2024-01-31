import { registerLocalStorage } from '../../helpers/functions.js';
import { showError } from '../../view/signUp.js';
import {
  auth,
  createUserWithEmailAndPassword,
/*   sendEmailVerification,
    updateProfile, */
} from '../configuraciones.js';
import { sendEmail } from './auth_send_email.js';

export const createUserWithEmailPsw = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        sendEmail()
        alert("te acabamos te enviar un email de confirmacion, verificalo 👨‍💻")
        console.log(user)
       /*  registerLocalStorage(user,name) */
      })
      .catch((error) => {
        const errorCode = error.code;
        /* console.log(errorCode) */
        showError(errorCode)
      });
};

/*

export const updateUserName = (name) => {
  return updateProfile(auth.currentUser, {
    displayName: name,
  }).then(() => {
    alert('Verifica tu correo para disfrutar de nuestro contenido');

    window.location.hash = '#/signIn';
  }).catch((error) => {
    console.error(error.code);
    alert('Lo sentimos, se ha producido un error');
  });
}; */
