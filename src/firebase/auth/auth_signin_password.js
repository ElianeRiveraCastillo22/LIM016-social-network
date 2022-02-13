import {auth, signInWithEmailAndPassword} from '../configuraciones.js';
import {onAuth} from './auth_state_listener.js';
import {showError} from '../../view/signin.js';

export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user.uid;
        const emailVerified = userCredential.user.emailVerified;
        if (emailVerified == true) {
          onAuth(user);
        } else {
          alert('Verfica tu correo para disfrutar de nuestro contenido');
        }
      })
      .catch((error) => {
        showError(error.code);
      });
};
