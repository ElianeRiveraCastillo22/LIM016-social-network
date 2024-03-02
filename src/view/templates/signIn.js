export const showSignIn = `
<div class="box--signIn">
  <h1 class="logo--queerPlace">Queer Place</h1>
  <form id="formRegister" class="signIn--form">

    <div class="form-control">
        <input id="email" class="input" type="email" placeholder="Correo electrónico">
        <img class="hiddenError" src="../../img/iconos/close.svg">
        <small class="messageError"></small>
    </div>

    <div class="form-control">
      <input id="password" class="input" type="password" placeholder="Contraseña">
      <img class="hiddenError" src="../../img/iconos/close.svg">
      <small class="messageError"></small>
    </div>

    <button id="btnSignIn" class="button"><p>Iniciar sesión</p></button>

  </form>
  <section class="signIn--options">

    <div class="loginInGoogle">
      <img class="google" src="https://brandlogos.net/wp-content/uploads/2015/09/google-favicon-vector-400x400.png" alt="google"> 
      <a id="google">Iniciar sesión con google</a>
    </div>
    <p class="signIn-text--question">¿Tienes cuenta?</p>
    <a class="goToOption">Registrarse</a>

  </section>
  <img class="imgRegistration" src="./img/CB2.png" alt="img">
</div>
`;