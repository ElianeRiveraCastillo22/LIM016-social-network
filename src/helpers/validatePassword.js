import { setErrorInput } from "./setErrorInput.js";

let strongPassword = false;
let strength = 0 ;

const validatePassword = (passwordValue,inputPassword)=>{

    passwordValue.length > 6 ? strength ++ : setErrorInput(inputPassword, "Debe tener mínimo 6 caracteres")
/*     passwordValue.match(/[a-z]/) && passwordValue.match(/[A-Z]/) ? strength++ : console.log("Debe tener al menos una minuscula y mayuscula")
  passwordValue.match(/\d/) ? strength++ : console.log("Debe de tener numeros") */
  if(strength==1){

    strongPassword=true
     /* console.log(strongPassword) */
  }
}
export {validatePassword,strongPassword}