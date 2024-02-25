import { activateBtn } from "../helpers/activeBtn.js";
import { firstLetterCapitalized } from "../helpers/firstLetterCapitalized.js";
import { updateProfile } from "./templates/updateProfile.js";

export const updateUserProfile = () => {

  const sectionupdateProfile = document.createElement('div');
  sectionupdateProfile.setAttribute('class', 'section--updateProfile');
  sectionupdateProfile.innerHTML = updateProfile;

  const inputName= sectionupdateProfile.querySelector(".updateProfile__name")
  const inputLastName = sectionupdateProfile.querySelector(".updateProfile__lastName")
  const btnRegisterupdate = sectionupdateProfile.querySelector("#btnRegisterupdate")
  const inputUpdateImg = sectionupdateProfile.querySelector("#updateImg")
  const imgUser= sectionupdateProfile.querySelector(".updatePorfile__imgUser img")

  let ApprovalScoreToUpdate=0;
  console.log(ApprovalScoreToUpdate)
  inputName.addEventListener("keyup",()=>{
    firstLetterCapitalized(inputName)
    if(inputName.value.length == 1){
        ApprovalScoreToUpdate++
        activateBtn(btnRegisterupdate,2,ApprovalScoreToUpdate)
    }
  })

  inputLastName.addEventListener("keyup",()=>{
    firstLetterCapitalized(inputLastName)
    if(inputLastName.value.length == 1){
        ApprovalScoreToUpdate++
        activateBtn(btnRegisterupdate,2,ApprovalScoreToUpdate)
    }
  })
  inputUpdateImg.addEventListener("change",(e)=>{

    const reader = new FileReader()
    reader.onload = async (event) => {
      imgUser.src=event.target.result
      console.log(event.target.result)
    }
    reader.readAsDataURL(inputUpdateImg.files[0])

  })
  btnRegisterupdate.addEventListener("click",(e)=>{
    e.preventDefault()
    if(ApprovalScoreToUpdate >= 2 || (inputName.value=="" && inputLastName.value=="")){
      console.log(ApprovalScoreToUpdate)
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
