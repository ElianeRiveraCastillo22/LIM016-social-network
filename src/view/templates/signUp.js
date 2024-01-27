export const showSignUp = `
<div class="box--singup">
  <h1 class="logo--queerPlace">Queer Place</h1>
  <form id="formRegister" class="singup--form">

    <div class="form-control">
      <input id="email" class="input" type="email" placeholder=" Correo electrónico">
      <i class="far fa-times-circle"></i>
      <small></small>
    </div>

    <div class="form-control">
      <input id="password" class="input" type="password" placeholder="  Contraseña">
      <i class="far fa-times-circle"></i>
      <small></small>
    </div>

    <button id="btnCheckIn" class="button">Registrar</button>

  </form>
  <section class="sinup--options">

    <div class="loginInGoogle">
      <img class="google" src="https://brandlogos.net/wp-content/uploads/2015/09/google-favicon-vector-400x400.png" alt="google"> 
      <a id="google">Iniciar sesión con google</a>
    </div>
    <p class="signup-text--question">¿Tienes cuenta?</p>
    <a  id="SignIn" class="goToOption">Entrar</a>

  </section>
  <img class="imgRegistration" src="./img/CB2.png" alt="img">
</div>
`;