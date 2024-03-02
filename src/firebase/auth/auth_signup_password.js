import { showErrorSignUp } from '../../helpers/showErrorSignUp.js';
import { signInPopUp } from '../../helpers/signInPopUp.js';
import { auth, createUserWithEmailAndPassword } from '../configuraciones.js';
import { addPointToFirestore, addUserToFirestore } from '../firestore/add_document.js';
import { sendEmail } from './auth_send_email.js';

export const createUserWithEmailPsw = (email, password,inputEmail,inputPassword,sectionSignUp,valueOptionRegister) => {

  return createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {

    const user = userCredential.user;
    sendEmail()
    signInPopUp(sectionSignUp)

    if(valueOptionRegister=="user"){
      addUserToFirestore(email,user.uid,"",password,[],"","user",false)
    }else if(valueOptionRegister=="point"){
      addPointToFirestore(user.uid,"","",email,password,"",[],[],"point",false)
    }

  })
  .catch((error) => {

    showErrorSignUp(error.code,inputEmail,inputPassword)

  });

};

/*

export const updateUserName = (name) => {
  return updateProfile(auth.currentUser, {
    displayName: name,
  }).then(() => {
    alert('Verifica tu correo para disfrutar de nuestro contenido');

    window.location.hash = '#/signIn';
  }).catch((error) => {
    console.error(error.code);
    alert('Lo sentimos, se ha producido un error');
  });
}; */
