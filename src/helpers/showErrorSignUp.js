import { setErrorInput } from "./setErrorInput.js";

export const showErrorSignUp = (error,inputEmail,inputPassword) => {
    switch (error) {

        case 'auth/internal-error':
          	setErrorInput(inputPassword, 'Ingrese contraseña');
         	break;

        case 'auth/weak-password':
			setErrorInput(inputPassword, 'Debe tener mínimo 6 caracteres');
			break;

        case 'auth/missing-password':
			setErrorInput(inputPassword, 'Ingresa tu contraseña');
			break;

        case 'auth/missing-email':
			setErrorInput(inputEmail, 'Ingresa tu email');
			break;

        case 'auth/invalid-email':
			setErrorInput(inputEmail, 'Correo electrónico invalido');
			break;

        case 'auth/email-already-in-use':
			setErrorInput(inputEmail, 'El correo ya esta registrado');
			break;

    }
};