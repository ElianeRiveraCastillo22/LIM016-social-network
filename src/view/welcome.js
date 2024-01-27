import { viewWelcome } from "./templates/welcome.js";

const join =() => {
  window.location.hash = '#/signIn';
};

export const Welcome = () => {

  const sectionWelcome = document.createElement('section');
  sectionWelcome.setAttribute('class', 'section--welcome');
  sectionWelcome.innerHTML = viewWelcome;

  setTimeout(join, 1000);
  return sectionWelcome;
};
