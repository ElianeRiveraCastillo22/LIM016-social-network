import { likeIconsTemplate, publicationConfigurationTemplate, publicationLabelsTemplate, starTemplate } from "../../view/templates/publications.js"

export const showPublicationSettings = ( data, userIdActive, publicationsContainer ) => {
    if( userIdActive == data.id_user )  publicationsContainer += publicationConfigurationTemplate(  data)
    return publicationsContainer
}

export const showStars = ( data, publicationsContainer ) => {

    for (let index = 0; index < data.rating; index++) {
        publicationsContainer += starTemplate("puntuacion_escogida")
    }

    for(let i = 0; i< 5 - data.rating; i++){
        publicationsContainer += starTemplate()
    }

    return publicationsContainer
}

export const showPublicationTags = ( data, publicationsContainer ) => {

    data.attributes.forEach((tag)=>{
        publicationsContainer += publicationLabelsTemplate(tag)
    })
    return publicationsContainer

}

export const showLikeIcon = ( data, userIdActive, publicationsContainer ) => {

    const activeUserLiked = data.usersWhoLiked.some(( userLike ) => userLike == userIdActive)
    activeUserLiked ? publicationsContainer += likeIconsTemplate(data.id_post,"liked") : publicationsContainer += likeIconsTemplate(data.id_post,"noLike");
    return publicationsContainer

}