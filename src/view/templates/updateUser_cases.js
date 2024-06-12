export const templateTypeUndefine = ()=>{
    const template = /*html*/ `
    <section class="updateProfile__googleRegister updateGglRegister">
      <p class="updateGglRegister_txt">Registrarse como:</p>
      <section class="updateGglRegister__recordTypes">
            <section class="updateGglRegister__type">
                <input type="radio" id="user" name="option register" value="user"/>
                <label for="user" class="updateGglRegister--selected" data-recordType="user-account">Usuario</label>
            </section>
            <section class="updateGglRegister__type">
                <input type="radio" id="point" name="option register" value="point"/>
                <label for="point" class="updateGglRegister--noselected" data-recordType="point-account">Lugar</label>
            </section>
      </section>
    </section>
    <section class="updateProfile__containerGglOptions">
        <div class="containerGglOptions__option">
            <input id="userName" class="input updateProfile__name" type="text" placeholder="Nombres y apellidos" autocomplete="off">
        </div>
        <div class="containerGglOptions__option containerGglOptions__hidden">
            <input id="userName" class="input updateProfile__namePoint" type="text" placeholder="Nombre del lugar" autocomplete="off">
            <textarea id="descriptionPoint" class="updateProfile__description" placeholder="Descripción del lugar"></textarea>
        </div>
    </section>
    `
    return template
}
export const templateTypeUser = /*html*/ `
    <input id="userName" class="input updateProfile__name" type="text" placeholder="Nombres" autocomplete="off">
`

export const templateTypePoint = /*html*/ `
    <input id="userName" class="input updateProfile__name" type="text" placeholder="Nombre del lugar" autocomplete="off">
    <textarea id="descriptionPoint" class="updateProfile__description" placeholder="Descripción del lugar"></textarea>
`

export const userRegistrationTemplate= /*html*/ `
    <details class="containerForm__details">
        <summary class="containerForm__fieldToEdit">Nombre de usuario</summary>
        <section class="containerForm__boxInput">
            <input id="userName" class="input updateProfile__name" type="text" placeholder="Nombres" autocomplete="off">
            <button class="btnSave btn--disebled">Actualizar</button>
        </section>
    </details>
    <details class="containerForm__details">
        <summary class="containerForm__fieldToEdit">Contraseña</summary>
        <section class="containerForm__boxInput">
            <input id="password" class="input updateProfile__password" type="text" placeholder="Contraseña" autocomplete="off">
            <button class="btnSave btn--disebled">Actualizar</button>
        </section>
    </details>
`
export const placeRegistrationTemplate= /*html*/ `
    <details class="containerForm__details">
        <summary class="containerForm__fieldToEdit">Nombre de usuario</summary>
        <section class="containerForm__boxInput">
            <input id="userName" class="input updateProfile__name" type="text" placeholder="Nombres" autocomplete="off">
            <button class="btnSave btn--disebled">Actualizar</button>
        </section>
    </details>
    <details class="containerForm__details">
        <summary class="containerForm__fieldToEdit">Contraseña</summary>
        <section class="containerForm__boxInput">
            <input id="password" class="input updateProfile__password" type="text" placeholder="Contraseña" autocomplete="off">
            <button class="btnSave btn--disebled">Actualizar</button>
        </section>
    </details>
    <details class="containerForm__details">
        <summary class="containerForm__fieldToEdit">Contraseña</summary>
        <section class="containerForm__boxInput">
            <input id="password" class="input updateProfile__password" type="text" placeholder="Contraseña" autocomplete="off">
            <textarea id="descriptionPoint" class="updateProfile__description" placeholder="Descripción del lugar"></textarea>
        </section>
    </details>
`
