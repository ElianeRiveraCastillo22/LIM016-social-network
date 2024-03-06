
export const publicationPostsUser = (name,photo) =>{
    const timeline = `
            <section class="createPost--user">
                <figure class="createUser--user__photo boxPerfil">
                    <img class="perfil" src=${photo} alt="">
                </figure>
                <p class="createPost--user__name user">${name}</p>
            </section>
            <form class="createPost__all">
                <div class="createPost__form">
                    <input placeholder="Nombre del lugar:" class="createPost__point" type="text" autocomplete="off">
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
                        <ul class="createpost__alltags">

                        </ul>
                    </section>
                    <section class="createPost__containerRating">
                        <section class="createPost__rating">
                            <p>¿Cómo lo calificas?</p>
                            <div class="createPost__stars">
                                <img src="../../img/iconos/star.svg" alt="star"/>
                                <img src="../../img/iconos/star.svg" alt="star"/>
                                <img src="../../img/iconos/star.svg" alt="star"/>
                                <img src="../../img/iconos/star.svg" alt="star"/>
                                <img src="../../img/iconos/star.svg" alt="star"/>
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

export const publicationPostsPoint = (name,photo) =>{
    const timeline = `
            <section class="createPost--user">
                <figure class="createUser--user__photo boxPerfil">
                    <img class="perfil" src=${photo} alt="">
                </figure>
                <p class="createPost--user__name user">${name}</p>
            </section>
            <form class="createPost__all">
                <div class="createPost__form">
                    <textarea class="createPost__Info" placeholder="Descripción de oferta:" autocomplete="off"></textarea>
                    <div class="createPost__validUntil">
                        <label class="" for="date">Valido desde:</label>
                        <input class="validUntil--start" id="date" type="date" >
                    </div>
                    <div class="createPost__validUntil">
                        <label for="date">Valido hasta:</label>
                        <input class="validUntil--end" id="date" type="date" >
                    </div>
                </div>
                <div class="btnPost">
                    <button id="btnSave" class="btnSave btn--active" >Publicar</button>
                </div>
            </form>
    `;
    return timeline
}