import { setErrorInput } from "./setErrorInput.js";

export const emailValidator = (inputEmail) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if(regex.test(inputEmail.value)){
        inputEmail.classList.add("completed")
    }else{
        setErrorInput(inputEmail, 'Correo electrónico invalido')
        inputEmail.classList.remove("completed")
    }
}