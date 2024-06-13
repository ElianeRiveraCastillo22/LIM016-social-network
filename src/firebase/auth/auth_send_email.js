import { auth, sendEmailVerification } from "../configuraciones.js";

export const sendEmail = () => {

    sendEmailVerification(auth.currentUser)
    .then(() => {
        /* console.log("email enviado") */
    })
    .catch((error)=>{
        console.log(console.log(error));
    })

}