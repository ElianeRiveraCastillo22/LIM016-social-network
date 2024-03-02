import { locationHome, locationUpdateUser } from '../../helpers/locations.js';
import {app, auth, dataUser, onAuthStateChanged} from '../configuraciones.js';
import { addUserToFirestore } from '../firestore/add_document.js';
import { getDocPoint, getDocUser } from '../firestore/get_document.js';
/* import { showHome } from '../../view/SignIn.js' */;
import { loginPersistence } from './auth_setPersistence.js';

let userActive;
let registryData;
let emailVerified;
export const listensToTheActiveUser = (sectionLoader) => {
  return onAuthStateChanged(auth, async(user) => {

    userActive= await user
    console.log(user.emailVerified)
    if (userActive !== undefined && user.emailVerified) {

      emailVerified=true
      localStorage.setItem('IdUsuario', user.uid)

      function creatingATemplateLoader(sectionLoader) {
        let btnSignInLoader=`
        <div class="btn__loader">
          <span class="btnloader__dot"></span>
          <span class="btnloader__dot"></span>
          <span class="btnloader__dot"></span>
        </div>
        `
        sectionLoader.innerHTML+= btnSignInLoader
        return sectionLoader
      }

      creatingATemplateLoader(sectionLoader)
      function obtainTheDocumentAndLocateIt() {
        getDocUser(user.uid).then((response)=>{

          if(response !== undefined){
            registryData = response;
            if(response.name == ""){
              locationUpdateUser()
            }else{
              locationHome()
            }
          }

        })
        .catch((error)=>{
          console.log(error)
        })

        getDocPoint(user.uid).then((response)=>{

          if(response !== undefined){

            registryData = response;

            if(response.name == ""){
              locationUpdateUser()
            }else{
              locationHome()
            }

          }

        })
        .catch((error)=>{
          console.log(error)
        })
      }

      if(userActive.providerData.length==1){

        if(userActive.providerData[0].providerId=="google.com"){

          let documentWasCreated = 2;

          function evaluatesWhetherTheDocWasCreated(response) {
            if(response !== undefined){
                userActive = response
                locationHome()
            }else{
              documentWasCreated -= 1
              if(documentWasCreated == 0){
                sectionLoader.lastElementChild.remove()
                locationUpdateUser()
              }
            }
          }
          getDocUser(user.uid).then((response)=>{
            evaluatesWhetherTheDocWasCreated(response)
          })

          getDocPoint(user.uid).then((response)=>{
            evaluatesWhetherTheDocWasCreated(response)
          })

        }else if(userActive.providerData[0].providerId=="password"){
          obtainTheDocumentAndLocateIt()
        }

      }else if(userActive.providerData.length==2){
        obtainTheDocumentAndLocateIt()
      }

    }else{

        alert("verifica tu correo 👮‍♀️")

    }
  });
};
export {
  userActive,
  emailVerified,
  registryData
}