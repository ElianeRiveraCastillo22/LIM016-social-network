import { setErrorInput } from "./setErrorInput.js";

export const showErrorSignIn = (error,inputEmail,inputPassword) => {
    switch (error) {
      case 'auth/internal-error':
        setErrorInput(inputPassword, 'Ingrese contraseña');
        break;
      case 'auth/wrong-password':
        setErrorInput(inputPassword, 'Contraseña incorrecta');
        break;
      case 'auth/invalid-email':
        setErrorInput(inputEmail, 'Correo electrónico invalido');
        break;
      case 'auth/user-not-found':
        setErrorInput(inputEmail, 'No se encuentra registrado');
        break;
      case 'auth/too-many-requests':
        setErrorInput(inputPassword,
            'Toma un descanso y vuelve a intentarlo');
        break;
      case 'auth/invalid-credential':
        setErrorInput(inputPassword,'correo o contraseña incorrecta');
        setErrorInput(inputEmail,'correo o contraseña incorrecta');
      break;
      default:
        setErrorInput(inputEmail, 'Lo sentimos, se ha producido un error');
        break;
    }
  };