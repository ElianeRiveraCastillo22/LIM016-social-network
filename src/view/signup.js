import {createUser} from '../firebase/auth/auth_signup_password.js';
import {googleAuth} from '../firebase/auth/auth_google_signin_popup.js';

export const backSignIn = () => {
  window.location.hash = '#/signIn';
};

const SignUp = () => {
  const showSignUp = `
  <div class="conteinerGeneral">
    <div class="SingUpBox">
      <h1>Queer Place</h1>
      <form id="formRegister" class="formRegister">
        <a class="loginInGoogle" id="btnStartGoogle"><img class="google" src="https://brandlogos.net/wp-content/uploads/2015/09/google-favicon-vector-400x400.png" alt="google"> iniciar sesión con google</a>
        <div class="form-control">
          <input id="email" class="input" type="email"
          placeholder=" Correo electrónico">
            <i class="far fa-times-circle"></i>
            <small></small>
        </div>
        <div class="form-control">
          <input id="password" class="input" type="password"
           placeholder="  Contraseña">
            <i class="far fa-times-circle"></i>
            <small></small>
        </div>
        <button id="btnCheckIn" class="button">Continuar</button>
        <p>¿Tienes cuenta?</p>
        <a  id="SignIn" class="loginInCheckIn">Entrar</a>
        <img class="imgRegistration" src="./img/CB2.png" alt="img">
      </form>
    </div>
  </div>
  `;

  const divElemt = document.createElement('div');
  divElemt.setAttribute('class', 'flexSection register');
  divElemt.innerHTML = showSignUp;

  const btnChekIn = divElemt.querySelector('#btnCheckIn');

  btnChekIn.addEventListener('click', registerUserNew);

  divElemt
      .querySelector('#btnStartGoogle').addEventListener('click', googleAuth);
  divElemt.querySelector('#SignIn').addEventListener('click', backSignIn);

  return divElemt;
};

export default SignUp;

export const registerUserNew = async (e) => {
  e.preventDefault();

  const email = e.target.closest('form').querySelector('#email').value;
  const password = e.target.closest('form').querySelector('#password').value;

  if (email === '' && password === '') {
    alert('Ups, debes completar el formulario');
  } else {
    await createUser(email, password);
  };
};

export const showErrorRegister = (error) => {
  const setErrorInput = (input, errorMessage) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    small.innerText = errorMessage;
    formControl.classList.add('error');

    formControl.addEventListener('keyup', () => {
      formControl.classList.remove('error');
    });
  };

  switch (error) {
    case 'auth/internal-error':
      setErrorInput(password, 'Ingrese contraseña');
      break;
    case 'auth/weak-password':
      setErrorInput(password, 'Debe tener mínimo 6 caracteres');
      break;
    case 'auth/invalid-email':
      setErrorInput(email, 'Correo electrónico invalido');
      break;
    case 'auth/email-already-in-use':
      setErrorInput(email, 'El correo ya se encuentra registrado');
      break;
  }
};
