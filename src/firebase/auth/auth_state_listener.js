import { locationHome, locationUpdateUser } from '../../helpers/locations.js';
import {auth, onAuthStateChanged} from '../configuraciones.js';
import { getDocPoint, getDocUser } from '../firestore/get_document.js';
import { updateRegistration } from '../firestore/update_document.js';

let userActive;
let registryData;
let emailVerified;
export const listensToTheActiveUser = (sectionLoader) => {
  return onAuthStateChanged(auth, async(user) => {

    userActive= await user
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
              updateRegistration(response.id,{active_session:true},response.nameRegister)
              localStorage.setItem('nameRegister', response.nameRegister)
              locationHome()

            }
          }

        })
        .catch((error)=>{
        })

        getDocPoint(user.uid).then((response)=>{

          if(response !== undefined){

            registryData = response;

            if(response.name == ""){
              locationUpdateUser()
            }else{
              updateRegistration(response.id,{active_session:true},response.nameRegister)
              localStorage.setItem('nameRegister', response.nameRegister)
              locationHome()
            }

          }

        })
        .catch((error)=>{
        })
      }

      if(userActive.providerData.length==1){

        if(userActive.providerData[0].providerId=="google.com"){

          let documentWasCreated = 2;

          function evaluatesWhetherTheDocWasCreated(response) {
            if(response !== undefined){
                userActive = response
                updateRegistration(response.id,{active_session:true},response.nameRegister)
                localStorage.setItem('nameRegister', response.nameRegister)
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