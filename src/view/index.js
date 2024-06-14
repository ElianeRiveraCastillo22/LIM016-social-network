import { DifferentPage } from "./404.js";
import { Nav } from "./nav.js";
import { Profile } from "./pprofile.js";
import { SignIn } from "./signin.js";
import { SignUp } from "./signup.js";
import { Timeline } from "./timeline.js";
import { updateRegistration } from "./updateRegistration.js";
import { Welcome } from "./welcome.js";

const components = {

    welcome: Welcome,
    nav: Nav,
    signIn: SignIn,
    signUp: SignUp,
    timeline: Timeline,
    profile: Profile,
    different: DifferentPage,
    updateRegistration: updateRegistration

};

export {components};
