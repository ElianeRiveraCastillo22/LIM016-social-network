import { DifferentPage } from "./404.js";
import { Nav } from "./Nav.js";
import { Profile } from "./Profile.js";
import { SignIn } from "./signin.js";
import { SignUp } from "./signup.js";
import { Timeline } from "./timeline.js";
import { updateUser } from "./updateUser.js";
import { Welcome } from "./welcome.js";

const components = {
    welcome: Welcome,
    nav: Nav,
    signIn: SignIn,
    signUp: SignUp,
    timeline: Timeline,
    profile: Profile,
    different: DifferentPage,
    updateUser: updateUser
};

export {components};
