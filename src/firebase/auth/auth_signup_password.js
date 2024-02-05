import { showErrorSignUp } from '../../helpers/showErrorSignUp.js';
import { auth, createUserWithEmailAndPassword } from '../configuraciones.js';
import { sendEmail } from './auth_send_email.js';

export const createUserWithEmailPsw = (email, password,inputEmail,inputPassword) => {
  return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        sendEmail()
        alert("te acabamos te enviar un email de confirmacion, verificalo 👨‍💻")
        console.log(user)
      })
      .catch((error) => {
        console.log(error.code)
        showErrorSignUp(error.code,inputEmail,inputPassword)
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
