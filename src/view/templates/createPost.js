
export const publicationPosts = (name,photo) =>{
    const timeline = `
    <div class="box--posts">
        <section class="createPost">
            <section class="createPost--user">
                <figure class="createUser--user__photo boxPerfil">
                    <img class="perfil" src=${photo} alt="">
                </figure>
                <p class="createPost--user__name user">${name}</p>
            </section>
            <form class="createPost__all">
                <div class="createPost__form">
                    <input placeholder="Nombre del lugar:" class="createPost__point" type="text">
                    <textarea class="createPost__Info" placeholder="¿Tienes alguna recomendación?" ></textarea>
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
                    <button id="btnSave" class="btnSave btnSave--disebled" >Publicar</button>
                </div>
            </form>
        </section>
        <div class="publicationPosts">

        </div>
        <dialog class="btnPost__message">
            <p>Agrega contenido a tu publicación por favor y vuelve a intentarlo</p>
        </dialog>
    </div>
    `;
    return timeline
}