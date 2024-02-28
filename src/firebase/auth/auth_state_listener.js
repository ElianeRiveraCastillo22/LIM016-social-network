import { locationHome, locationUpdateUser } from '../../helpers/locations.js';
import {app, auth, dataUser, onAuthStateChanged} from '../configuraciones.js';
import { addUserToFirestore } from '../firestore/add_document.js';
/* import { showHome } from '../../view/SignIn.js' */;
import { loginPersistence } from './auth_setPersistence.js';

let userActive
export const listensToTheActiveUser = () => {
  return onAuthStateChanged(auth, async(user) => {
    userActive= await user
    if (userActive !== undefined && user.emailVerified) {
      if(user.displayName !== null){
        //registro con google
        locationHome()
        addUserToFirestore(userActive.email, userActive.uid, userActive.displayName, '', [], userActive.photoURL,'')
      }else{
        //registro con google
        locationUpdateUser()
      }

    }else{
        alert("verifica tu correo 👮‍♀️")
    }
  });
};
export {
  userActive
}