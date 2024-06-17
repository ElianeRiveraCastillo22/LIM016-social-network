import { showLikeIcon, showPublicationSettings, showPublicationTags, showStars } from "../../helpers/publications/publicationTemplate_functions.js"
import { updatePhotoURL } from "../../helpers/updatePhotoURL.js"

export const templatePublications = (data, userIdActive) => {
    let templatePublication = ""
    templatePublication += /*html*/ `
    <section class="publicationPosts__publication" data-IDPublication="${data.id_post}">
      <article class="box--publicationPosts">
        <header class="boxProfile publicationPosts--profile">
            <div class="boxProfile--user">
                <figure class="boxProfilePhoto publicationPosts--photo">
                    <img class="perfil" src="${updatePhotoURL(data.photoOfPublicationOwner)}"  alt="profile picture">
                </figure>
                <p class="user--name publicationPosts--name">${data.publicationOwner}</p>
            </div>`
            templatePublication = showPublicationSettings(data,userIdActive, templatePublication)
        templatePublication += /*html*/ `
        </header>
        <section class="publicationReview">
            <section class="publicationReview--user">
                <p class="publicationReview--namePoint">${data.name_point}</p>
                <div class="createPost__stars" data-rating="${data.rating}">`
                templatePublication = showStars(data, templatePublication)
                templatePublication += /*html*/ `
                </div>
            </section>
            <section class="publicationReview--review">
                <div class="publicationReview--box">
                <figure class="publicationReview--imgReference">
                    <img src="img/imgDefauld.png"  alt="profile picture by defauld"/>
                </figure>
                <section class="publicationReview--post">
                    <p>${data.description}</p>
                    <section class="publicationReview--tags">`
                    templatePublication = showPublicationTags(data, templatePublication)
                    templatePublication += /*html*/`
                    </section>
                </section>
                </div>
                <section class="publicationReview--like">
                    <p class="publicationReview--valueLike">${data.likes} me gusta</p>`
                    templatePublication = showLikeIcon(data, userIdActive, templatePublication)
                templatePublication += /*html*/`
                </section>
            </section>
        </section>
      </article>
    </section>
    `
    return templatePublication
}

export const publicationConfigurationTemplate = ( data ) => {
    const publicationConfiguration= /*html*/ `
    <figure class="boxProfile--iconMore" popovertarget="${data.id_post}">
      <img src="img/iconos/more.svg" alt="icon more"/>
    </figure>
    <dialog id="${data.id_post}" class="boxProfile__popupEditorDelate">
        <li class="popupEditorDelate__containerBox">
            <ul class="popupEditorDelate__box popupEditorDelate__box--Edit" data-IDPublication="${data.id_post}">
                <img class="popupEditorDelate__icon" src="img/iconos/edit.svg" alt="icon update"/>
                <p class="popupEditorDelate__txt">Editar</p>
            </ul>
            <ul class="popupEditorDelate__box popupEditorDelate__box--delete" data-IDPublication="${data.id_post}">
                <img class="popupEditorDelate__icon" src="img/iconos/delate.svg" alt="icon delate" />
                <p class="popupEditorDelate__txt">Eliminar</p>
            </ul>
        </li>
    </dialog>`
    return publicationConfiguration
}

export const starTemplate = ( className = "" ) => {
    const star = /*html*/`
    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="#ffffff00" d="M4.95242 5.55686L6.51094 2.25231C6.71098 1.82809 7.28902 1.82809 7.48906 2.25231L9.04756 5.55686L12.5329 6.09004C12.9801 6.15845 13.1583 6.73377 12.8346 7.06377L10.313 9.63423L10.9081 13.2656C10.9845 13.7319 10.5168 14.0875 10.1167 13.8673L7 12.1518L3.88328 13.8673C3.48316 14.0875 3.01545 13.7319 3.09187 13.2656L3.68695 9.63423L1.16545 7.06377C0.841703 6.73377 1.01993 6.15845 1.46711 6.09004L4.95242 5.55686Z" stroke="#F6AF00" stroke-opacity="0.74" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"/>
    </svg>
    `
    return star
}
export const publicationLabelsTemplate = ( label ) => {
    const tag = /*html*/ `
        <p class="publicationReview--tag createpost__tag">${ label }</p>
    `
    return tag
}
export const likeIconsTemplate = (idPost, className = "" ) => {
    const likeIcon = /*html*/ `
    <svg width="22" height="21" viewBox="0 0 22 21" xmlns="http://www.w3.org/2000/svg">
        <path data-idpublication="${idPost}" d="M21.0001 7.58683C21.0001 9.13331 20.4063 10.6187 19.3459 11.7175C16.905 14.2476 14.5375 16.8859 12.0054 19.3243C11.425 19.8751 10.5043 19.855 9.94892 19.2793L2.65388 11.7175C0.44887 9.43181 0.44887 5.74184 2.65388 3.45618C4.88056 1.14806 8.50806 1.14806 10.7347 3.45618L10.9999 3.73103L11.2649 3.45634C12.3325 2.34911 13.7865 1.72461 15.3054 1.72461C16.8243 1.72461 18.2782 2.34905 19.3459 3.45618C20.4064 4.55506 21.0001 6.04038 21.0001 7.58683Z" stroke="#653CAD" stroke-width="2" stroke-linejoin="round" class="publicationReview--iconLike ${className}" />
    </svg>
    `
    return likeIcon
}
export const publicationLabelTemplate = ( identificationText ) => {
    const label = /*html*/ `
    <li class="createpost__tag">
        <p class="createpost__txt" >${identificationText}</p>
        <div class="createPost__boxIconClose">
            <svg class="createPost__iconClose--form" width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.0917 6.90834C13.0142 6.83023 12.922 6.76824 12.8205 6.72593C12.7189 6.68362 12.61 6.66184 12.5 6.66184C12.39 6.66184 12.2811 6.68362 12.1795 6.72593C12.078 6.76824 11.9858 6.83023 11.9083 6.90834L10 8.825L8.09167 6.90834C7.93475 6.75142 7.72192 6.66326 7.5 6.66326C7.27809 6.66326 7.06526 6.75142 6.90834 6.90834C6.75142 7.06526 6.66326 7.27809 6.66326 7.5C6.66326 7.72192 6.75142 7.93475 6.90834 8.09167L8.825 10L6.90834 11.9083C6.83023 11.9858 6.76824 12.078 6.72593 12.1795C6.68362 12.2811 6.66184 12.39 6.66184 12.5C6.66184 12.61 6.68362 12.7189 6.72593 12.8205C6.76824 12.922 6.83023 13.0142 6.90834 13.0917C6.98581 13.1698 7.07797 13.2318 7.17952 13.2741C7.28107 13.3164 7.38999 13.3382 7.5 13.3382C7.61001 13.3382 7.71894 13.3164 7.82049 13.2741C7.92203 13.2318 8.0142 13.1698 8.09167 13.0917L10 11.175L11.9083 13.0917C11.9858 13.1698 12.078 13.2318 12.1795 13.2741C12.2811 13.3164 12.39 13.3382 12.5 13.3382C12.61 13.3382 12.7189 13.3164 12.8205 13.2741C12.922 13.2318 13.0142 13.1698 13.0917 13.0917C13.1698 13.0142 13.2318 12.922 13.2741 12.8205C13.3164 12.7189 13.3382 12.61 13.3382 12.5C13.3382 12.39 13.3164 12.2811 13.2741 12.1795C13.2318 12.078 13.1698 11.9858 13.0917 11.9083L11.175 10L13.0917 8.09167C13.1698 8.0142 13.2318 7.92203 13.2741 7.82049C13.3164 7.71894 13.3382 7.61001 13.3382 7.5C13.3382 7.38999 13.3164 7.28107 13.2741 7.17952C13.2318 7.07797 13.1698 6.98581 13.0917 6.90834V6.90834ZM15.8917 4.10834C15.1229 3.31242 14.2034 2.67757 13.1867 2.24083C12.17 1.80409 11.0765 1.5742 9.97001 1.56458C8.86352 1.55497 7.76619 1.76582 6.74205 2.18482C5.71792 2.60383 4.78749 3.22261 4.00505 4.00505C3.22261 4.78749 2.60383 5.71792 2.18482 6.74205C1.76582 7.76619 1.55497 8.86352 1.56458 9.97001C1.5742 11.0765 1.80409 12.17 2.24083 13.1867C2.67757 14.2034 3.31242 15.1229 4.10834 15.8917C4.87706 16.6876 5.7966 17.3224 6.8133 17.7592C7.83 18.1959 8.9235 18.4258 10.03 18.4354C11.1365 18.445 12.2338 18.2342 13.258 17.8152C14.2821 17.3962 15.2125 16.7774 15.995 15.995C16.7774 15.2125 17.3962 14.2821 17.8152 13.258C18.2342 12.2338 18.445 11.1365 18.4354 10.03C18.4258 8.9235 18.1959 7.83 17.7592 6.8133C17.3224 5.7966 16.6876 4.87706 15.8917 4.10834V4.10834ZM14.7167 14.7167C13.6267 15.8078 12.1921 16.4874 10.6573 16.6394C9.12255 16.7915 7.58251 16.4067 6.29961 15.5506C5.0167 14.6946 4.0703 13.4202 3.62165 11.9446C3.17299 10.469 3.24984 8.88346 3.8391 7.45816C4.42836 6.03286 5.49357 4.85596 6.85325 4.12797C8.21293 3.39999 9.78296 3.16595 11.2958 3.46573C12.8087 3.76552 14.1709 4.58058 15.1502 5.77206C16.1295 6.96353 16.6655 8.4577 16.6667 10C16.6696 10.8761 16.4988 11.744 16.1641 12.5537C15.8294 13.3633 15.3374 14.0985 14.7167 14.7167V14.7167Z" fill="#A081D9" fill-opacity="0.73"/>
            </svg>
        </div>
    </li>
    `
    return label
}


