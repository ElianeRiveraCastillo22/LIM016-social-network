export function updatePhotoURL(registrationPhoto) {

    let photoPath
    if (registrationPhoto) photoPath = registrationPhoto
    if (!registrationPhoto || registrationPhoto == null) photoPath = "img/avatar.png"
    return photoPath

}