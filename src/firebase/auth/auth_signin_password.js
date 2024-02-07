import {auth, signInWithEmailAndPassword} from '../configuraciones.js';
/* import {onAuth} from './auth_state_listener.js'; */
import {showError} from '../../view/SignIn.js';
import { listensToTheActiveUser } from './auth_state_listener.js';


export const verifyWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        /* const emailVerified = userCredential.user.emailVerified; */
        listensToTheActiveUser()
      })
      .catch((error) => {
        showError(error.code);
      });
};
