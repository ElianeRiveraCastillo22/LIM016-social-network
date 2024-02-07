import { showProfile } from "./templates/profile.js";

export const Profile = () => {
    const sectionSingin = document.createElement('div');
    sectionSingin.setAttribute('class', 'section--porfile');
    sectionSingin.innerHTML = showProfile;
    return sectionSingin
}