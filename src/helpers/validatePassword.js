import { setErrorInput } from "./setErrorInput.js";

const validatePassword = (passwordValue,inputPassword)=>{
    passwordValue.length >= 6 ? console.log("contraseña fuerte") : setErrorInput(inputPassword, "Debe tener mínimo 6 caracteres")
/*     passwordValue.match(/[a-z]/) && passwordValue.match(/[A-Z]/) ? strength++ : console.log("Debe tener al menos una minuscula y mayuscula")
  passwordValue.match(/\d/) ? strength++ : console.log("Debe de tener numeros") */

}
export {validatePassword}