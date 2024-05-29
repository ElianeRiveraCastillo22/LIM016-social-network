import { showLikeIcon, showPublicationSettings, showPublicationTags, showStars } from "../../helpers/publicationFunctions.js"
import { updatePhotoURL } from "../../helpers/timeline-fuctions/timeline-funsctions.js"

export const templatePublications = (data, otherUsers, userIdActive, publicationsContainer) => {
    publicationsContainer += `
    <section class="publicationPosts__publication" data-IDPublication="${data.id_post}">
      <article class="box--publicationPosts">
        <header class="boxProfile publicationPosts--profile">
            <div class="boxProfile--user">
                <figure class="boxProfilePhoto publicationPosts--photo">
                    <img class="perfil" src="${updatePhotoURL(otherUsers)}" alt="image profile">
                </figure>
                <p class="user--name publicationPosts--name">${otherUsers.name}</p>
            </div>`
            publicationsContainer = showPublicationSettings(data,userIdActive, publicationsContainer)
        publicationsContainer += `
        </header>
        <section class="publicationReview">
            <section class="publicationReview--user">
                <p class="publicationReview--namePoint">${data.name_point}</p>
                <div class="createPost__stars">`
                publicationsContainer = showStars(data, publicationsContainer)
                publicationsContainer += `
                </div>
            </section>
            <section class="publicationReview--review">
                <div class="publicationReview--box">
                <figure class="publicationReview--imgReference">
                    <img src="../img/imgDefauld.png" />
                </figure>
                <section class="publicationReview--post">
                    <p>${data.description}</p>
                    <section class="publicationReview--tags">`
                    publicationsContainer = showPublicationTags(data, publicationsContainer)
                    publicationsContainer +=`
                    </section>
                </section>
                </div>
                <section class="publicationReview--like">
                    <p class="publicationReview--valueLike">${data.likes} me gusta</p>`
                    publicationsContainer = showLikeIcon(data, userIdActive, publicationsContainer)
                publicationsContainer +=`
                </section>
            </section>
        </section>
      </article>
    </section>
    `
    return publicationsContainer
}

export const publicationConfigurationTemplate = ( data ) => {
    const publicationConfiguration= `
    <figure class="boxProfile--iconMore" popovertarget="${data.id_post}">
      <img src="../img/iconos/more.svg"/>
    </figure>
    <dialog id="${data.id_post}" class="boxProfile__popupEditorDelate">
      <li class="popupEditorDelate__containerBox">
          <ul class="popupEditorDelate__box popupEditorDelate__box--Edit" >
            <img class="popupEditorDelate__icon" src="../img/iconos/edit.svg" alt="icono de editar"/>
            <p class="popupEditorDelate__txt">Editar</p>
          </ul>
          <ul class="popupEditorDelate__box popupEditorDelate__box--delete" >
            <img class="popupEditorDelate__icon" src="../img/iconos/delate.svg" alt="icono de eliminar" />
            <p class="popupEditorDelate__txt">Eliminar</p>
          </ul>
      </li>
    </dialog>`
    return publicationConfiguration
}

export const starTemplate = ( className = "" ) => {
    const star =`
    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="white" d="M4.95242 5.55686L6.51094 2.25231C6.71098 1.82809 7.28902 1.82809 7.48906 2.25231L9.04756 5.55686L12.5329 6.09004C12.9801 6.15845 13.1583 6.73377 12.8346 7.06377L10.313 9.63423L10.9081 13.2656C10.9845 13.7319 10.5168 14.0875 10.1167 13.8673L7 12.1518L3.88328 13.8673C3.48316 14.0875 3.01545 13.7319 3.09187 13.2656L3.68695 9.63423L1.16545 7.06377C0.841703 6.73377 1.01993 6.15845 1.46711 6.09004L4.95242 5.55686Z" stroke="#F6AF00" stroke-opacity="0.74" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"/>
    </svg>
    `
    return star
}
export const publicationLabelsTemplate = ( label ) => {
    const tag = `
        <div class="publicationReview--tag createpost__tag">${ label }</div>
    `
    return tag
}
export const likeIconsTemplate = ( className = "" ) => {
    const likeIcon = `
    <svg width="22" height="21" viewBox="0 0 22 21" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.0001 7.58683C21.0001 9.13331 20.4063 10.6187 19.3459 11.7175C16.905 14.2476 14.5375 16.8859 12.0054 19.3243C11.425 19.8751 10.5043 19.855 9.94892 19.2793L2.65388 11.7175C0.44887 9.43181 0.44887 5.74184 2.65388 3.45618C4.88056 1.14806 8.50806 1.14806 10.7347 3.45618L10.9999 3.73103L11.2649 3.45634C12.3325 2.34911 13.7865 1.72461 15.3054 1.72461C16.8243 1.72461 18.2782 2.34905 19.3459 3.45618C20.4064 4.55506 21.0001 6.04038 21.0001 7.58683Z" stroke="#653CAD" stroke-width="2" stroke-linejoin="round" class="publicationReview--iconLike ${className}" />
    </svg>
    `
    return likeIcon
}
export const publicationLabelTemplate = ( identificationText ) => {
    const label = `
    <li class="createpost__tag">
        <p class="createpost__txt" >${identificationText}</p>
        <figure class="createpost__figure">
        <img class="createpost__img" src="../../img/iconos/close-post.svg" />
        </figure>
    </li>
    `
    return label
}
export const popupRemovePublication = () => {
    const dialog = `
    <div class="removePublication__box">
      <p class="removePublication__txt">¿Seguro que quiere eliminar la publicación? 🤔</p>
      <section class="removePublication__containerBtn">
        <button class="removePublication__btn removePublication__btn--cancel btn--secondary" >Cancelar</button>
        <button class="removePublication__btn removePublication__btn--delete btn--primary" >Eliminar</button>
      </section>
    </div>
    `
    return dialog
}

