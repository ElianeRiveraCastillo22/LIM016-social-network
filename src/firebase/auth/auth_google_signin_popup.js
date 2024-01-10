import {auth,provider, GoogleAuthProvider, signInWithPopup } from "../configuraciones.js";
import { sendEmail } from "./auth_send_email.js";
import { listensToTheActiveUser } from "./auth_state_listener.js";
export const googleAuth = () =>{
  signInWithPopup(auth, provider)
  .then((result) => {
    /* sendEmail() */
    listensToTheActiveUser();
  }).catch((error) => {
    console.log(error);
/*     const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error); */
  });
}


/* import {auth, provider, signInWithPopup} from '../configuraciones.js';
import {onAuth} from './auth_state_listener.js';


export const googleAuth = () => {
  return signInWithPopup(auth, provider)
      .then((result) => {
        console.log('Nombre:', result.user.displayName);
        console.log('Email:', result.user.email);
        mailVerificado('Verficado:', result.user.emailVerified);
        onAuth(provider);
      })
      .catch((error) => {
        console.error(error.code);

        manejarErrores(error.code);
      });
};

const manejarErrores = (errorCode) => {
  if (errorCode === 'auth/popup-closed-by-user') {
    console.error('El usuario cerró la ventana');
  }
};

const mailVerificado = (verificado) => {
  if (verificado) {
    console.log('si esta verficado');
  } else {
    // funcion que manda mail verificacion
  }
};
 */