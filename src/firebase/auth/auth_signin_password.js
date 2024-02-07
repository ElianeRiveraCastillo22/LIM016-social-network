import {auth, signInWithEmailAndPassword} from '../configuraciones.js';
import { listensToTheActiveUser } from './auth_state_listener.js';
import { showErrorSignIn } from '../../helpers/showErrorSignIn.js';


export const verifyWithEmailAndPassword = (email, password,inputEmail,inputPassword) => {
  console.log(email,password)
  return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        listensToTheActiveUser()
      })
      .catch((error) => {
        showErrorSignIn(error.code,inputEmail,inputPassword)
      });
};
