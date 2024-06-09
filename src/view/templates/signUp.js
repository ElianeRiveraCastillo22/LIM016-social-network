export const showSignUp = /*html*/ `
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
			<div class="typeregister__container">
				<p>Registrarse como:</p>
				<section class="form__radios">
					<section class="form__optionRegister">
					<input id="user" type="radio" name="option register" value="user" class="optionRegister" data-recordType="user-account">
					<label for="user">Usuario</label>
					</section>
					<section class="form__optionRegister">
					<input id="point" type="radio" name="option register" value="point" class="optionRegister"  data-recordType="point-account">
					<label for="point">Lugar</label>
					</section>
				</section>
			</div>
			<small class="typeregister__warningTxt"></small>
		</div>

		<button id="btnSignUp" class="button">
			<p>Registrase</p>
		</button>

	</form>
	<section class="signUp--options">
		<div class="loginInGoogle">
			<div class="loginInGoogle__container">
				<img class="google" src="https://brandlogos.net/wp-content/uploads/2015/09/google-favicon-vector-400x400.png" alt="google"> 
				<a id="google">Iniciar sesión con Google</a>
			</div>
			<div class="loginInGoogle__loader">

			</div>
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