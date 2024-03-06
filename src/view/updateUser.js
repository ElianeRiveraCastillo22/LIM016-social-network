import { registryData, userActive } from "../firebase/auth/auth_state_listener.js";
import { addPointToFirestore, addUserToFirestore } from "../firebase/firestore/add_document.js";
import { updateRegistration } from "../firebase/firestore/update_document.js";
import { locationHome } from "../helpers/locations.js";
import { updateProfile } from "./templates/updateProfile.js";
import { templateTypePoint, templateTypeUndefine, templateTypeUser } from "./templates/updateUser_cases.js";

export const updateUser = () => {

    const sectionupdateProfile = document.createElement('div');
    sectionupdateProfile.setAttribute('class', 'section--updateProfile');
    sectionupdateProfile.innerHTML = updateProfile;

    const containerInputsForm= sectionupdateProfile.querySelector(".updateProfile__containerForm")
    const btnRegisterupdate = sectionupdateProfile.querySelector("#btnRegisterupdate")
    const inputUpdateImg = sectionupdateProfile.querySelector("#updateImg")
    const imgUser= sectionupdateProfile.querySelector(".updatePorfile__imgUser img")

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

    if(registryData == undefined){

      containerInputsForm.innerHTML= templateTypeUndefine
      const containerGglOptionsOptions = containerInputsForm.querySelectorAll(".containerGglOptions__option")
      const updateGglRegisterTypes = containerInputsForm.querySelectorAll(".updateGglRegister__type label")
      const inputName = containerInputsForm.querySelector(".updateProfile__name")
      const inputNamePoint = containerInputsForm.querySelector(".updateProfile__namePoint")
      const inputDescription = containerInputsForm.querySelector(".updateProfile__description")

      let typeRegister = "user";

      if(typeRegister == "user"){

        inputName.value = userActive.displayName
        imgUser.src= userActive.photoURL

      }

      updateGglRegisterTypes.forEach((optionRegister)=>{

        optionRegister.addEventListener("click",(e)=>{

          e.preventDefault()
          typeRegister = optionRegister.previousElementSibling.value

          if(typeRegister == "point"){
            inputNamePoint.value = userActive.displayName
          }
          function showsRegistrationOptions() {

            if(optionRegister.classList=="updateGglRegister--noselected"){
              optionRegister.classList.add("updateGglRegister--selected")
            }else if(optionRegister.classList=="updateGglRegister--selected"){
              return
            }

            if(optionRegister.innerText.toLowerCase()=="usuario"){
              containerGglOptionsOptions[0].classList.remove("containerGglOptions__hidden")
              containerGglOptionsOptions[1].classList.add("containerGglOptions__hidden")
            }else if(optionRegister.innerText.toLowerCase()=="lugar"){
              containerGglOptionsOptions[1].classList.remove("containerGglOptions__hidden")
              containerGglOptionsOptions[0].classList.add("containerGglOptions__hidden")
            }

            updateGglRegisterTypes.forEach((optionType)=>{
              if(optionType.classList[0]=="updateGglRegister--selected"){
                optionType.classList.remove("updateGglRegister--selected")
                optionType.classList.add("updateGglRegister--noselected")
              }else if(optionType.classList.length==2){
                optionType.classList.remove("updateGglRegister--noselected")
              }
            })

          }

          showsRegistrationOptions()

        })

      })

      btnRegisterupdate.addEventListener("click",(e)=>{

        e.preventDefault()

        if(typeRegister == "user"){
          addUserToFirestore(userActive.email,userActive.uid,userActive.displayName,"",[],userActive.photoURL,typeRegister,true)
          localStorage.setItem("nameRegister", "user-account")
        }else if(typeRegister == "point"){
          inputNamePoint.value = userActive.displayName
          addPointToFirestore(userActive.uid, userActive.displayName, userActive.photoURL, userActive.email, "", inputDescription.value, [], [], typeRegister,true)
          localStorage.setItem("nameRegister", "point-account")
        }
        locationHome()

      })

    }else if(registryData.typeOfRegistration =="user"){

      containerInputsForm.innerHTML= templateTypeUser
      const inputName= sectionupdateProfile.querySelector(".updateProfile__name")

      btnRegisterupdate.addEventListener("click",(e)=>{
        e.preventDefault()
        updateRegistration(registryData.id, {name:inputName.value,active_session:true},"user-account")
        localStorage.setItem("nameRegister", "user-account")
        locationHome()
      })

    }else if(registryData.typeOfRegistration == "point"){

      containerInputsForm.innerHTML= templateTypePoint
      const inputName= sectionupdateProfile.querySelector(".updateProfile__name")
      const description = sectionupdateProfile.querySelector(".updateProfile__description")

      btnRegisterupdate.addEventListener("click",(e)=>{
        e.preventDefault()
        updateRegistration(registryData.id, {name:inputName.value, description:description.value,active_session:true},"point-account")
        localStorage.setItem("nameRegister", "point-account")
        locationHome()
      })

    }

  return sectionupdateProfile;
};
