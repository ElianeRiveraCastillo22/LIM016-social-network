export const showSignIn = `
<div class="box--singIn">
  <p class="singIn--title">¡Bienvenidx!</p>
  <form id="formLogIn" class="singIn--form">

    <div class="form-control">
      <input id="email" type="email" placeholder="Correo electrónico">
      <i class="far fa-times-circle"></i>
      <small></small>
    </div>

    <div class="form-control">
      <input id="email" type="email" placeholder="Correo electrónico">
      <i class="far fa-times-circle"></i>
      <small></small>
    </div>

    <div class="form-control form__typeregister">
      <p>Registrarse como:</p>
      <div class="form__radios">
        <input type="radio">
        <input type="radio">
      </div>
    </div>

    <button id="btnSignIn" class="button">Inicia sesión</button>

  </form>
  <section class="sinup--options">
    <div class="loginInGoogle">
      <img class="google" src="https://brandlogos.net/wp-content/uploads/2015/09/google-favicon-vector-400x400.png" alt="google"> 
      <a id="google">Iniciar sesión con google</a>
    </div>

    <p class="signin-text--question">¿No tienes cuenta?</p>
    <a id="btnSignUp" class="goToOption">Regístrate</a>
  </section>
  <img src="./img/CB2.png" alt="img Welcome" class="imgRegistration">
</div>
`;