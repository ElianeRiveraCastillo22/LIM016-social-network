import { auth, onAuthStateChanged } from '../configuraciones.js';

export const listensToTheActiveUser = async() => {
    let userActive;
    try{
        await onAuthStateChanged(auth,(user) => {
            if (user) {
                console.log("usuario activo")
                userActive = user
            } else {
                console.log("usuario cerro sesion")
            }
        });
    }catch(error){
        console.log(error)
    }finally{
        console.log("finalizo la carga de usuario activo")
    }
    return userActive
};
