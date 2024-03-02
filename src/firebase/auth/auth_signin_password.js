import {auth, signInWithEmailAndPassword} from '../configuraciones.js';
import { listensToTheActiveUser } from './auth_state_listener.js';
import { showErrorSignIn } from '../../helpers/showErrorSignIn.js';

export const verifyWithEmailAndPassword = (email, password,inputEmail,inputPassword,btnSignIn) => {
  return signInWithEmailAndPassword(auth, email, password)

  .then((userCredential) => {
    listensToTheActiveUser(btnSignIn)
  })
  .catch((error) => {
    showErrorSignIn(error.code,inputEmail,inputPassword)
  });

};
