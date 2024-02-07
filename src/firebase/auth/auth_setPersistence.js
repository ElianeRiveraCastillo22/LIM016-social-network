import { auth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence  } from "../configuraciones.js";

export const loginPersistence = (email,password) =>{
    setPersistence(auth, browserSessionPersistence)
    .then(() => {
    
      return signInWithEmailAndPassword(auth, email, password);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}