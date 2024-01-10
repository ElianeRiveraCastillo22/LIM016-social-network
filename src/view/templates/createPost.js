
export const publicationPosts = (name,photo) =>{
    const timeline = `
    <div class="box--posts">
        <form id="form" class="createPost">
            <section class="createPost--user">
                <figure class="createUser--user__photo boxPerfil">
                    <img class="perfil" src=${photo} alt="">
                </figure>
                <p class="createPost--user__name user">${name}</p>
            </section>
            <textarea id="postDescription" class="create--post postDescription"
            placeholder="¿Tienes alguna recomendación?" ></textarea>
            <div class="btnPost">
                <button id="btnSave" class="btnSave">Publicar</button>
            </div>
        </form>
        <div id="publicationPosts">

        </div>
    </div>
    `;
    return timeline
}