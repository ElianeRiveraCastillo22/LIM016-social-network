export const templateTypeUndefine = `
<section class="updateProfile__googleRegister updateGglRegister">
  <p class="updateGglRegister_txt">Registrarse como:</p>
  <section class="updateGglRegister__recordTypes">
      <section class="updateGglRegister__type">
          <input type="radio" id="user" name="option register" value="user"/>
          <label for="user" class="updateGglRegister--selected">Usuario</label>
      </section>
      <section class="updateGglRegister__type">
          <input type="radio" id="point" name="option register" value="point"/>
          <label for="point" class="updateGglRegister--noselected">Lugar</label>
      </section>
  </section>
</section>
<section class="updateProfile__containerGglOptions">
    <div class="containerGglOptions__option">
        <input id="userName" class="input updateProfile__name" type="text" placeholder="Nombres y apellidos" autocomplete="off">
    </div>
    <div class="containerGglOptions__option containerGglOptions__hidden ">
        <input id="userName" class="input updateProfile__namePoint" type="text" placeholder="Nombre del lugar" autocomplete="off">
        <textarea id="descriptionPoint" class="updateProfile__description" placeholder="Descripción del lugar"></textarea>
    </div>
</section>
`
export const templateTypeUser =`
    <input id="userName" class="input updateProfile__name" type="text" placeholder="Nombres" autocomplete="off">
`

export const templateTypePoint =`
    <input id="userName" class="input updateProfile__name" type="text" placeholder="Nombre del lugar" autocomplete="off">
    <textarea id="descriptionPoint" class="updateProfile__description" placeholder="Descripción del lugar"></textarea>
`