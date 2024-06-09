import { auth, signOut } from '../configuraciones.js';

export const signOutUser = () => {

    return signOut(auth)
    .then(() => {
		console.log('El Usuario cerró sesión');
    })
    .catch((error) => {
      	console.error(error.code);
    });

};
