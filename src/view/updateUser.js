/* import {updateUserName} from '../firebase/auth/auth_signup_password.js'; */

import { updateProfile } from "./templates/updateProfile.js";

export const updateUserProfile = () => {

  const divElemt = document.createElement('div');
  divElemt.setAttribute('class', 'section--updateProfile');
  divElemt.innerHTML = updateProfile;


  return divElemt;
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
