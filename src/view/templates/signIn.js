export const showSignIn = /*html*/ `
<div class="box--signIn">
	<h1 class="logo--queerPlace">Queer Place</h1>
	<form id="formRegister" class="signIn--form">

		<div class="form-control">
			<input id="email" class="input" type="email" placeholder="Correo electrónico">
			<img class="hiddenError" src="img/iconos/close.svg" alt="icon close">
			<small class="messageError"></small>
		</div>

		<div class="form-control">
		<input id="password" class="input" type="password" placeholder="Contraseña">
		<img class="hiddenError" src="img/iconos/close.svg" alt="icon close">
		<small class="messageError"></small>
		</div>

		<button id="btnSignIn" class="button"><p>Iniciar sesión</p></button>

	</form>
	<section class="signIn--options">

		<div class="loginInGoogle">
		<div class="loginInGoogle__container">
			<img class="google" src="img/iconos/google.svg" alt="icon google">
			<a id="google">Iniciar sesión con Google</a>
		</div>
		<div class="loginInGoogle__loader">

		</div>
		</div>
		<p class="signIn-text--question">¿Tienes cuenta?</p>
		<a class="goToOption">Registrarse</a>

	</section>
	<img class="imgRegistration" src="img/imageOfTheGirls.png" alt="image of the girls">
</div>
<dialog class="signUp__popup signUp__popup--close">
	<div>
		<p>Te enviamos un mensaje a tu correo, verificalo 👨‍💻</p>
		<button class="btnpopup__signUp">Ok!</button>
	</div>
</dialog>
`;
export const templateLoaderSingin = () => {
  let loadedFromLogin = /*html*/ `
	<div class="btn__loader">
		<span class="btnloader__dot"></span>
		<span class="btnloader__dot"></span>
		<span class="btnloader__dot"></span>
	</div>
  `
  return loadedFromLogin
}