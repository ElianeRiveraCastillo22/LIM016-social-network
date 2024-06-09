export const skeletonOfTheUser = () =>{
    const skeleton = /*html*/ `

    <div class="boxProfilePhoto--skeleton animationBgSkeleton">
    </div>

    <div class="user__name--skeleton animationBgSkeleton" >
    </div>

    `
    return skeleton
}
export const skeletonPublicationForm = () => {
    const skeleton = /*html*/ `
    <section class="createPost--user boxProfile">
        <div class="boxProfilePhoto--skeleton animationBgSkeleton">
        </div>
        <div class="user__name--skeleton animationBgSkeleton" >
        </div>
    </section>
    <div class="createPost__all">
        <div class="createPost__form--skeleton animationBgSkeleton">

        </div>

        <div class="createPost__containebtn--skeleton">
            <div class="createPost__containebtn--btn animationBgSkeleton"></div>
        </div>
    </div>
    `
    return skeleton
}
export const skeletonPublications = () => {
    const skeletonPublication = /*html*/ `
    <section class="publicationPosts__publication publicationContainer" data-IDPublication="">
        <article class="box--publicationPosts">
            <header class="boxProfile publicationPosts--profile">
            <div class="boxProfile--user">
                <div class="boxProfilePhoto--skeleton animationBgSkeleton">
                </div>
                <div class="user__name--skeleton animationBgSkeleton" >
                </div>
            </div>
            <div class="boxProfile__iconMore--skeleton animationBgSkeleton" >
            </div>
            </header>
            <section class="publicationReview">
                <section class="publicationReview--user">
                    <div class="publicationReview__namePoint--skeleton animationBgSkeleton"></div>
                    <div class="createPost__stars--skeleton animationBgSkeleton"></div>
                </section>
                <section class="publicationReview--review">
                    <div class="publicationReview__box--skeleton">
                        <div class="publicationReview--imgReference--skeleton animationBgSkeleton">
                        </div>
                        <div class="publicationReview__post--skeleton">
                            <div class="publicationReview__imgReference--skeleton animationBgSkeleton">
                            </div>
                            <div class="publicationReview__tags--skeleton animationBgSkeleton">
                            </div>
                        </div>
                    </div>
                    <section class="publicationReview--like">
                    <div class="publicationReview__like--skeleton "></div>
                    </section>
                </section>
            </section>
        </article>
        <article class="box--publicationPosts">
            <header class="boxProfile publicationPosts--profile">
            <div class="boxProfile--user">
                <div class="boxProfilePhoto--skeleton animationBgSkeleton">
                </div>
                <div class="user__name--skeleton animationBgSkeleton" >
                </div>
            </div>
            <div class="boxProfile__iconMore--skeleton animationBgSkeleton" >
            </div>
            </header>
            <section class="publicationReview">
                <section class="publicationReview--user">
                    <div class="publicationReview__namePoint--skeleton animationBgSkeleton"></div>
                    <div class="createPost__stars--skeleton animationBgSkeleton"></div>
                </section>
                <section class="publicationReview--review">
                    <div class="publicationReview__box--skeleton">
                        <div class="publicationReview--imgReference--skeleton animationBgSkeleton">
                        </div>
                        <div class="publicationReview__post--skeleton">
                            <div class="publicationReview__imgReference--skeleton animationBgSkeleton">
                            </div>
                            <div class="publicationReview__tags--skeleton animationBgSkeleton">
                            </div>
                        </div>
                    </div>
                    <section class="publicationReview--like">
                    <div class="publicationReview__like--skeleton "></div>
                    </section>
                </section>
            </section>
        </article>
        <article class="box--publicationPosts">
            <header class="boxProfile publicationPosts--profile">
            <div class="boxProfile--user">
                <div class="boxProfilePhoto--skeleton animationBgSkeleton">
                </div>
                <div class="user__name--skeleton animationBgSkeleton" >
                </div>
            </div>
            <div class="boxProfile__iconMore--skeleton animationBgSkeleton" >
            </div>
            </header>
            <section class="publicationReview">
                <section class="publicationReview--user">
                    <div class="publicationReview__namePoint--skeleton animationBgSkeleton"></div>
                    <div class="createPost__stars--skeleton animationBgSkeleton"></div>
                </section>
                <section class="publicationReview--review">
                    <div class="publicationReview__box--skeleton">
                        <div class="publicationReview--imgReference--skeleton animationBgSkeleton">
                        </div>
                        <div class="publicationReview__post--skeleton">
                            <div class="publicationReview__imgReference--skeleton animationBgSkeleton">
                            </div>
                            <div class="publicationReview__tags--skeleton animationBgSkeleton">
                            </div>
                        </div>
                    </div>
                    <section class="publicationReview--like">
                    <div class="publicationReview__like--skeleton "></div>
                    </section>
                </section>
            </section>
        </article>
    </section>

    `
    return skeletonPublication
}
export function templateLoader(sectionContainer,msj) {
    sectionContainer.innerHTML += /*html*/ `
    <div class="popupLoader">
      <div class="popupLoader__containerLoader">
        <span class="loader"></span>
        <p class="popupLoader__msj">${msj}</p>
      </div>
    </div>
    `
}
export function threePointTemplates(buttonType){
    const threePoints = /*html*/ `
    <div class="btn__loader">
        <span class="btnloader__dot ${buttonType}"></span>
        <span class="btnloader__dot ${buttonType}"></span>
        <span class="btnloader__dot ${buttonType}"></span>
    </div>
    `
    return threePoints
}