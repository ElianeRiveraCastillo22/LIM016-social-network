import {auth, signOut} from '../configuraciones.js';
import {backSignIn} from '../../view/signup.js';


export const signOutUser = () => {
  return signOut(auth)
      .then(() => {
        console.log('El Usuario cerró sesión');
        backSignIn();
      })
      .catch((error) => {
        console.error(error.code);
      });
};
