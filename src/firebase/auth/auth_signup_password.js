import { showErrorSignUp } from '../../helpers/showErrorSignUp.js';
import { auth, createUserWithEmailAndPassword } from '../configuraciones.js';
import { sendEmail } from './auth_send_email.js';

export const createUserWithEmailPsw = async(accountData) => {
    let userCredential
    try{
        userCredential = await createUserWithEmailAndPassword(auth,accountData.email, accountData.password)
        sendEmail()
        return userCredential
    }catch(error){
        showErrorSignUp(error.code, email, password)
    }finally{
        console.log("cuenta creada")
    }
    return userCredential
};
