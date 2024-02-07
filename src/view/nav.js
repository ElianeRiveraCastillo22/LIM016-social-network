import { signOutUser } from "../firebase/auth/auth_sign_out.js";
import { locationHome, locationProfile } from "../helpers/locations.js";

const showHome = () => {
  window.location.hash = '#/signIn';
};

export const Nav = () => {
  const showNav = `
      <figure id="profile" class="nav--section">
        <img class="nav--icon" src="../img/nav/account.svg">
        <figcaption>Perfil</figcaption>
      </figure>
      <figure id="home" class="nav--section">
        <img class="nav--icon" src="../img/nav/home.svg">
        <figcaption>Home</figcaption>
      </figure>
      <figure class="nav--section">
        <img class="nav--icon" src="../img/nav/configuration.svg">
        <figcaption>Configurar</figcaption>
      </figure>
      <figure class="nav--section">
        <img class="nav--icon" id="signout" src="../img/nav/close.svg">
        <figcaption>Close</figcaption>
      </figure>



    `;

  const navElemt = document.createElement('nav');
  navElemt.innerHTML = showNav;
  const navSection = navElemt.querySelectorAll(".nav--section")

  navElemt.querySelector("#signout").addEventListener('click',signOutUser)
  navElemt.querySelector("#signout").addEventListener('click',showHome)

  const {hash}= location
  const currentHash=hash.split("/")[1]
  let htmlHashCurrent=navElemt.querySelector("#"+ currentHash)

/*   htmlHashCurrent.classList.add("nav__select--hash")
  console.log(navSection) */
  navSection.forEach((hashCurrent,indexCurrentHash) => {
    hashCurrent.addEventListener("click",()=>{

      /* console.log(hashCurrent) */
      if(indexCurrentHash==0){
        locationProfile()
      }else if(indexCurrentHash==1){
        locationHome()
      }
    })

  });

  return navElemt;
};

