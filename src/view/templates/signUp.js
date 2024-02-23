export const showSignUp = `
<div class="box--signUp">
  <p class="signUp--title">¡Bienvenidx!</p>
  <form id="formLogIn" class="signUp--form">

    <div class="form-control">
      <input id="email" type="email" placeholder="Correo electrónico">
      <img class="hiddenError" src="../../img/iconos/close.svg">
      <small></small>
    </div>

    <div class="form-control">
      <input id="password" class="input" type="password" placeholder="Contraseña">
      <img class="hiddenError" src="../../img/iconos/close.svg">
      <small></small>
    </div>

    <div class="form-control form__typeregister">
      <p>Registrarse como:</p>
      <div class="form__radios">
        <div class="form__optionRegister">
          <input type="radio" name="option register">
          <label>Usuario</label>
        </div>
        <div class="form__optionRegister">
          <input type="radio" name="option register">
          <label>Lugar</label>
        </div>
      </div>
    </div>

    <button id="btnSignUp" class="button">Registrase</button>

  </form>
  <section class="signUp--options">
    <div class="loginInGoogle">
      <img class="google" src="https://brandlogos.net/wp-content/uploads/2015/09/google-favicon-vector-400x400.png" alt="google"> 
      <a id="google">Iniciar sesión con google</a>
    </div>

    <p class="signUp-text--question">¿No tienes cuenta?</p>
    <a class="goToOption">Iniciar sesión</a>
  </section>
  <img src="./img/CB2.png" alt="img Welcome" class="imgRegistration">
</div>
<dialog class="signUp__popup signUp__popup--close">
  <div>
      <p>te acabamos te enviar un email de confirmacion, verificalo 👨‍💻</p>
      <button class="btnpopup__signUp">Ok!</button>
  </div>
</dialog>
`;