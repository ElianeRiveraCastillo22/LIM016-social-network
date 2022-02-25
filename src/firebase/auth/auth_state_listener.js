import {auth, onAuthStateChanged} from '../configuraciones.js';
import {currentUser} from '../../view/timeline.js';
import {showHome} from '../../view/signin.js';

export const onAuth = () => {
  return onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      const uid = user.uid;
      const name = user.displayName;
      const photo = user.photoURL;
      currentUser(uid, name, photo);
      showHome();
    }
  });
};
