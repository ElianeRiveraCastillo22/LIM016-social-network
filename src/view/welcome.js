import { viewWelcome } from "./templates/welcome.js";

const join =() => {
  window.location.hash = '#/signIn';
};

export const Welcome = () => {

  const sectionWelcome = document.createElement('section');
  sectionWelcome.setAttribute('class', 'section--welcome');
  sectionWelcome.innerHTML = viewWelcome;

  sectionWelcome.querySelector('#btnJoin').addEventListener('click', join);

  return sectionWelcome;
};
