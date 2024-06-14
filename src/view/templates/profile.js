export const showProfile = /*html*/ `
    <div class="box__profile profile">
        <div class="profile__boxRegister">

        </div>
        <div class="profile__createPublications--box">

        </div>
        <div class="profile__publications--box">

        </div>
        <dialog class="popup__dialog" >

        </dialog>
    </div>

`
export const templateInfoUser = (name, photoUser)=>{
    const userProfile = /*html*/ `
        <figure class="profile__boxPhotoUser">
            <img src="${photoUser}" class="profile__photoUser" alt="profile picture"/>
        </figure>
        <section class="profile__boxInfo">
            <h1 class="profile__name">${name}</h1>
        </section>
    `
    return userProfile
}
export const templateInfoPoint = (name, descrition, photoUser)=>{
    const userProfile = /*html*/ `
        <figure class="profile__boxPhotoUser">
            <img src="${photoUser}" class="profile__photoUser" alt="profile picture"/>
        </figure>
        <section class="profile__boxInfo">
            <h1 class="profile__name">${name}</h1>
            <p>${descrition}</p>
        </section>
    `
    return userProfile
}