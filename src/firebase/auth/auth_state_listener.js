import { locationHome, locationUpdateUser } from '../../helpers/locations.js';
import {app, auth, dataUser, onAuthStateChanged} from '../configuraciones.js';
/* import { showHome } from '../../view/SignIn.js' */;
import { loginPersistence } from './auth_setPersistence.js';

let userActive
export const listensToTheActiveUser = () => {
  return onAuthStateChanged(auth, (user) => {
    if (user !== undefined && user.emailVerified) {
      console.log(user.displayName)
      if(user.displayName !== null){
        locationHome()
      }else{
        locationUpdateUser()
      }
      userActive=user

    }else{
        alert("verifica tu correo 👮‍♀️")
    }
  });
};
export {
  userActive
}