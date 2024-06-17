import { setErrorInput } from "./setErrorInput.js";

export const validateseEmptyInputs = (emailValue,passwordValue,inputEmail,inputPassword) => {

    if(!emailValue && !passwordValue){

		setErrorInput(inputEmail, 'Ingresa tu correo electronico');
		setErrorInput(inputPassword, 'Ingresa tu contraseña');

    }else if (!emailValue){

      	setErrorInput(inputEmail, 'Ingresa tu correo electronico');

    }else if(!passwordValue){

      	setErrorInput(inputPassword, 'Ingresa tu contraseña');
    }

}