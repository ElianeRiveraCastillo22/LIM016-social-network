import {updateUserName} from '../firebase/auth/auth_signup_password.js';

const updateUserProfile = () => {
  const UpdateProfile = `
    <div class="conteinerGeneral">
      <div class="SingUpBox update" >
        <h2>¿Con qué nombre te identificas?</h2>
        <form id="formRegister" class="formRegister">
          <div class="form-control">
            <input id="name" class="input" type="text"
            placeholder=" Nombre">
          </div>

          <div class="form-control">
            <input id="lastname" class="input" type="text"
            placeholder="  Apellido">
          </div>

          <button id="btnCheckIn" class="button">Confirmar</button>

          <img class="imgRegistration" src="./img/CB2.png" alt="img">
        </form>
      </div>
    </div>
  `;

  const divElemt = document.createElement('div');
  divElemt.setAttribute('class', 'flexSection');
  divElemt.innerHTML = UpdateProfile;

  divElemt.querySelector('#btnCheckIn').addEventListener('click', registerUser);

  return divElemt;
};

export default updateUserProfile;

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
};
