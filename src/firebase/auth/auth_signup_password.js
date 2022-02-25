import {
  auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from '../configuraciones.js';
import {showErrorRegister} from '../../view/signup.js';

export const createUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const email = userCredential.user.email;

        userVerification(email)
            .then(() => {
              window.location.hash = '#/profile';
            });
      })
      .catch((error) => {
        const errorCode = error.code;
        showErrorRegister(errorCode);
      });
};

export const userVerification = () => {
  return sendEmailVerification(auth.currentUser);
};

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
};
