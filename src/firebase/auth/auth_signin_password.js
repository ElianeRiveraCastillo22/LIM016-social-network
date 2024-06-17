import { auth, signInWithEmailAndPassword } from '../configuraciones.js';
import { showErrorSignIn } from '../../helpers/showErrorSignIn.js';

export const verifyWithEmailAndPassword = async(accountData) => {
    let userCredential
    const { email, password } = accountData

    try{
        userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
        return userCredential
    }catch(error){
        showErrorSignIn(error.code, email, password)
    }

    return userCredential
};
