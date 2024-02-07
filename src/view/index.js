/* import Welcome from './welcome.js';
import SignUp from './Signup.js';
import Nav from './nav.js';
import {timeline} from './timeline.js';
import { SignIn } from './signIn.js';
import Different from './404.js';
import Profile from './updateUser.js';
import SignOut from './signout.js'; */

import { DifferentPage } from "./404.js";
import { Nav } from "./Nav.js";
import { Profile } from "./Profile.js";
import { SignIn } from "./SignIn.js";
import { SignUp } from "./Signup.js";
import { updateUserProfile } from "./UpdateUser.js";
import { Timeline } from "./Timeline.js";
import { Welcome } from "./welcome.js";


const components = {
  welcome: Welcome,
  nav: Nav,
  signIn: SignIn,
  signUp: SignUp,
  timeline: Timeline,
  profile: Profile,
  updateUser:updateUserProfile,
  different: DifferentPage,
  updateProfile: updateUserProfile
};

export {components};
