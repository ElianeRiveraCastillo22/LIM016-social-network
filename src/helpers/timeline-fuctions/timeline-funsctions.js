export function updatePhotoURL(userData) {
    let pathImgPorfile = userData.url_profile;
     if (pathImgPorfile == ""){
       pathImgPorfile = "../img/avatar.png"
     }
     return pathImgPorfile
}