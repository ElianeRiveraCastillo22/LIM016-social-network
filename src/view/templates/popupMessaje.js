export const popupMessaje = (messaje, btnName, classEdit="") => {
    const dialog = /*html*/ `
    <div class="popupBox__content ${classEdit}">
        <p class=" popupBox__messsaje">${messaje}</p>
        <section class="popupBox__containerBtn">
            <button class="popupBox__btn popupBox__btn--cancel btn--secondary" >Cancelar</button>
            <button class="popupBox__btn popupBox__btn--${btnName} btn--primary" >${btnName}</button>
        </section>
    </div>
    `
    return dialog
}