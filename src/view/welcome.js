import { locationSignIn } from "../helpers/locations.js";
import { viewWelcome } from "./templates/welcome.js";

const join =() => {
  window.location.hash = '#/signIn';
};

export const Welcome = () => {

  const sectionWelcome = document.createElement('section');
  sectionWelcome.setAttribute('class', 'section--welcome');
  sectionWelcome.innerHTML = viewWelcome;

  setTimeout(locationSignIn, 1000);
  return sectionWelcome;
};
