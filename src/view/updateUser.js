import { userActive } from "../firebase/auth/auth_state_listener.js";
import { addUserToFirestore } from "../firebase/firestore/add_document.js";
import { getDocPoint, getDocUser } from "../firebase/firestore/get_document.js";
import { updateRegistration } from "../firebase/firestore/update_document.js";
import { activateBtn } from "../helpers/activeBtn.js";
import { firstLetterCapitalized } from "../helpers/firstLetterCapitalized.js";
import { locationHome } from "../helpers/locations.js";
import { updateProfile } from "./templates/updateProfile.js";

export const updateUserProfile = () => {

    const sectionupdateProfile = document.createElement('div');
    sectionupdateProfile.setAttribute('class', 'section--updateProfile');
    sectionupdateProfile.innerHTML = updateProfile;

    const containerInputsForm= sectionupdateProfile.querySelector(".updateProfile__containerForm")
    const btnRegisterupdate = sectionupdateProfile.querySelector("#btnRegisterupdate")
    const inputUpdateImg = sectionupdateProfile.querySelector("#updateImg")
    const imgUser= sectionupdateProfile.querySelector(".updatePorfile__imgUser img")


    function activateTheRegistrationBtn(inputName, lastNameOTextarea,typeAccount,score) {
      let ApprovalScoreToUpdate=0
      let urlImgProfile=undefined

      function evaluatesIfItHasText(inputName) {
        inputName.addEventListener("keyup",()=>{
          firstLetterCapitalized(inputName)
          if(inputName.value.length == 1){
              ApprovalScoreToUpdate++
              activateBtn(btnRegisterupdate,2,ApprovalScoreToUpdate)
          }
        })
      }
      evaluatesIfItHasText(inputName)
      evaluatesIfItHasText(lastNameOTextarea)

      function getImage() {
        inputUpdateImg.addEventListener("change",(e)=>{
          const reader = new FileReader()
          reader.onload = async (event) => {
            imgUser.src=event.target.result
            urlImgProfile=event.target.result
          }
          reader.readAsDataURL(inputUpdateImg.files[0])
        })
      }
      getImage()

      function updateTheData() {
        btnRegisterupdate.addEventListener("click",(e)=>{
          e.preventDefault()
          if(ApprovalScoreToUpdate >= score){
            let userName;
            let objectUser;

            if (urlImgProfile == undefined) {
              urlImgProfile="../img/avatar.png"
            }
            if(typeAccount=="user"){
              userName = inputName.value.concat(' ',lastNameOTextarea.value)
              objectUser={
                name:userName,
                url_profile:urlImgProfile,
              }
              console.log(objectUser)
              updateRegistration(userActive.uid, objectUser,"user-account")

            }else if(typeAccount=="point"){
              userName = inputName.value
              let descriptionPoint= lastNameOTextarea.value
              objectUser={
                name:userName,
                description:descriptionPoint,
                url_profile:urlImgProfile,
              }
              console.log(objectUser)
              updateRegistration(userActive.uid, objectUser, "point-account")
            }
            locationHome()
          }
        })
      }
      updateTheData()

    }

    getDocUser(userActive.uid).then((response)=>{
      console.log(response)
      if(response !== undefined){
        containerInputsForm.innerHTML= `
          <input id="userName" class="input updateProfile__name" type="text" placeholder="Nombres" autocomplete="off">
          <input id="userName" class="input updateProfile__lastName" type="text" placeholder="Apellidos" autocomplete="off">
        `
        const inputName= sectionupdateProfile.querySelector(".updateProfile__name")
        const inputLastName = sectionupdateProfile.querySelector(".updateProfile__lastName")
        activateTheRegistrationBtn(inputName, inputLastName,response.typeOfRegistration,2)
      }else{
        return console.log("se creo una cuenta como lugar")
      }
    })
    getDocPoint(userActive.uid).then((response)=>{
      if(response !== undefined){
        containerInputsForm.innerHTML= `
          <input id="userName" class="input updateProfile__name" type="text" placeholder="Nombre del lugar" autocomplete="off">
          <textarea id="descriptionPoint" class="updateProfile__description" placeholder="Descripción del lugar"></textarea>
        `
        const inputName= sectionupdateProfile.querySelector(".updateProfile__name")
        const descriptionPoint = sectionupdateProfile.querySelector(".updateProfile__description")
        activateTheRegistrationBtn(inputName, descriptionPoint,response.typeOfRegistration,2)
      }else{
        return console.log("se creo una cuenta como usuario")
      }
    })

  return sectionupdateProfile;
};

/* 
export const registerUser = (e) => {
  e.preventDefault();

  const name = e.target.closest('form').querySelector('#name').value;
  const lastname = e.target.closest('form').querySelector('#lastname').value;

  if (name === '' && lastname === '') {
    alert('Ups, debes completar el formulario');
  } else {
    const displayName = name + ' ' + lastname;
    updateUserName(displayName);
    console.log(displayName, 'actualizó su perfil');
  }
}; */
