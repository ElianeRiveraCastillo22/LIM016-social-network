import { setErrorInput } from "./setErrorInput.js";

export const showErrorSignIn = (error,inputEmail,inputPassword) => {
    switch (error) {
      case 'auth/internal-error':
        setErrorInput(inputPassword, 'Ingrese contraseña');
        break;
      case 'auth/weak-password':
        console.log(inputPassword);
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
        setErrorInput(inputEmail, 'El correo ya se encuentra registrado');
        break;
      default:
          setErrorInput(inputEmail, 'correo o contraseña incorrecta');
          setErrorInput(inputPassword, 'correo o contraseña incorrecta');
          break;
    }
  };