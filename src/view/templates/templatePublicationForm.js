export const templatePublicationForm = (name,photo) =>{
    const timeline = `
        <section class="createPost--user boxProfile">
        <figure class="cretePost--photo boxProfilePhoto">
            <img class="perfil" src=${photo} alt="image profile">
        </figure>
        <p class="user--name">${name}</p>
        </section>
        <form class="createPost__all">
            <div class="createPost__form">
                <input placeholder="Nombre del lugar:" class="createPost__point incomplete" type="text" autocomplete="off">
                <textarea class="createPost__Info" placeholder="¿Tienes alguna recomendación?" autocomplete="off"></textarea>
                <section class="createPost__tags">
                    <div class="createTags">
                        <input class="createTags__input createTags__input--onFocus" placeholder="inlusivos o diversos con:" type="text">
                        <ul class="createTags__list">

                        </ul>
                        <figure class="createTags__aprove createTags__aprove--onFocus">
                            <img class="" src="../../img/iconos/aprove-post.svg"/>
                        </figure>
                    </div>
                    <ul class="createpost__alltags createTags__input--onFocus incomplete">

                    </ul>
                </section>
                <section class="createPost__containerRating">
                    <section class="createPost__rating">
                        <p>¿Cómo lo calificas?</p>
                        <div class="createPost__stars">
                            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill="white" d="M4.95242 5.55686L6.51094 2.25231C6.71098 1.82809 7.28902 1.82809 7.48906 2.25231L9.04756 5.55686L12.5329 6.09004C12.9801 6.15845 13.1583 6.73377 12.8346 7.06377L10.313 9.63423L10.9081 13.2656C10.9845 13.7319 10.5168 14.0875 10.1167 13.8673L7 12.1518L3.88328 13.8673C3.48316 14.0875 3.01545 13.7319 3.09187 13.2656L3.68695 9.63423L1.16545 7.06377C0.841703 6.73377 1.01993 6.15845 1.46711 6.09004L4.95242 5.55686Z" stroke="#F6AF00" stroke-opacity="0.74" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill="white" d="M4.95242 5.55686L6.51094 2.25231C6.71098 1.82809 7.28902 1.82809 7.48906 2.25231L9.04756 5.55686L12.5329 6.09004C12.9801 6.15845 13.1583 6.73377 12.8346 7.06377L10.313 9.63423L10.9081 13.2656C10.9845 13.7319 10.5168 14.0875 10.1167 13.8673L7 12.1518L3.88328 13.8673C3.48316 14.0875 3.01545 13.7319 3.09187 13.2656L3.68695 9.63423L1.16545 7.06377C0.841703 6.73377 1.01993 6.15845 1.46711 6.09004L4.95242 5.55686Z" stroke="#F6AF00" stroke-opacity="0.74" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill="white" d="M4.95242 5.55686L6.51094 2.25231C6.71098 1.82809 7.28902 1.82809 7.48906 2.25231L9.04756 5.55686L12.5329 6.09004C12.9801 6.15845 13.1583 6.73377 12.8346 7.06377L10.313 9.63423L10.9081 13.2656C10.9845 13.7319 10.5168 14.0875 10.1167 13.8673L7 12.1518L3.88328 13.8673C3.48316 14.0875 3.01545 13.7319 3.09187 13.2656L3.68695 9.63423L1.16545 7.06377C0.841703 6.73377 1.01993 6.15845 1.46711 6.09004L4.95242 5.55686Z" stroke="#F6AF00" stroke-opacity="0.74" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill="white" d="M4.95242 5.55686L6.51094 2.25231C6.71098 1.82809 7.28902 1.82809 7.48906 2.25231L9.04756 5.55686L12.5329 6.09004C12.9801 6.15845 13.1583 6.73377 12.8346 7.06377L10.313 9.63423L10.9081 13.2656C10.9845 13.7319 10.5168 14.0875 10.1167 13.8673L7 12.1518L3.88328 13.8673C3.48316 14.0875 3.01545 13.7319 3.09187 13.2656L3.68695 9.63423L1.16545 7.06377C0.841703 6.73377 1.01993 6.15845 1.46711 6.09004L4.95242 5.55686Z" stroke="#F6AF00" stroke-opacity="0.74" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill="white" d="M4.95242 5.55686L6.51094 2.25231C6.71098 1.82809 7.28902 1.82809 7.48906 2.25231L9.04756 5.55686L12.5329 6.09004C12.9801 6.15845 13.1583 6.73377 12.8346 7.06377L10.313 9.63423L10.9081 13.2656C10.9845 13.7319 10.5168 14.0875 10.1167 13.8673L7 12.1518L3.88328 13.8673C3.48316 14.0875 3.01545 13.7319 3.09187 13.2656L3.68695 9.63423L1.16545 7.06377C0.841703 6.73377 1.01993 6.15845 1.46711 6.09004L4.95242 5.55686Z" stroke="#F6AF00" stroke-opacity="0.74" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </section>
                    <div class="createPost__file">
                        <label for="fileUpload"><img src="../../img/iconos/image.svg"/></label>
                        <input type="file" id="fileUpload" name="fileUpload">
                    </div>
                </section>
            </div>

            <div class="btnPost">
                <button id="btnSave" class="btnSave btn--disebled" >Publicar</button>
            </div>
        </form>
    `;
    return timeline
}