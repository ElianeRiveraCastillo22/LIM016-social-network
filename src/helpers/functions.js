import { publicationPosts } from "../view/templates/createPost.js";
/* export const registerLocalStorage = (userActive) => {

  localStorage.setItem('Nombre', userActive.displayName);
  localStorage.setItem('IdUsuario', userActive.uid);
  localStorage.setItem('Correo', userActive.email);
  localStorage.setItem('photoURL', userActive.photoURL);
} */
export const createUser = (userActive,sectionFather) =>{

      if(userActive !== undefined){
        /* registerLocalStorage(userActive) */
        sectionFather.innerHTML = publicationPosts(userActive.displayName,userActive.photoURL);
      }

/*       const userID = localStorage.getItem('IdUsuario');
      const userName = localStorage.getItem('Nombre');
      const userEmail = localStorage.getItem('Correo');
      const userPhoto = localStorage.getItem('photoURL'); */
      
  }