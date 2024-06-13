import { auth, onAuthStateChanged } from '../configuraciones.js';

export const listensToTheActiveUser = async() => {

    let userActive;
    try{

        await onAuthStateChanged(auth,(user) => {

            if (user) userActive = user

        });

    }catch(error){

        console.log(error)

    }

    return userActive

};
