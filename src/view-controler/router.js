/* import DifferentPage from '../view/404.js'; */
import {components} from '../view/index.js';
/* import { Nav } from '../view/Nav.js';
import { SignIn } from '../view/SignIn.js';
import { SignUp } from '../view/Signup.js';
import { Timeline } from '../view/timeline.js'; */

import { Welcome } from '../view/welcome.js';

const changeView = (container,navegador) => {
  container.innerHTML= ''
  navegador.innerHTML= ''
  let { hash } = location;
  switch (hash) {
    case '':
    case '#':
    case '#/': {
      container.append(components.welcome());
      break;
    }
    case '#/signIn': {
      container.append(components.signIn());
      break;
    }
    case '#/signUp': {
      container.append(components.signUp());
      break;
    }
    case '#/home': {
      navegador.append(components.nav());
      container.append(components.timeline());
      break;
    }
    case '#/profile': {
      navegador.append(components.nav());
      container.append(components.profile());
      break;
    }
    case '#/update-profile': {
      container.append(components.updateProfile());
      break;
    }
/*    case '#/signOut': {
      navegador.appendChild(components.nav());
      container.appendChild(components.signOut());
      break;
    } */
    default:
      return container.append(components.different());
  }
};

export {changeView};
