import { setErrorInput } from "./setErrorInput.js";

const validatePassword = (inputPassword)=>{

	if(inputPassword.value.length >= 6){
		inputPassword.classList.add("completed")
	}else{
		setErrorInput(inputPassword, "Debe tener mínimo 6 caracteres")
		inputPassword.classList.remove("completed")
	}
}
export {validatePassword}