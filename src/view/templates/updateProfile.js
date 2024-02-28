
export const updateProfile =`
<div class="box--updateProfile">
    <section class="updateProfile__containerImg">
        <div class="updateProfile__imgUser">
            <figure class="updatePorfile__imgUser">
                <img src="../../img/avatar.png">
            </figure>
            <div class="updatePorfile__iconChange">
                <label for="updateImg">
                    <img src="../../img/iconos/change_img.svg">
                </label>
                <input type="file" id="updateImg" name="updateImg">
            </div>
        </div>
    </section>
    <form id="formRegister" class="updateProfile--form">
        <div class="updateProfile__containerForm">
            <span class="loader"></span>
        </div>
        <button id="btnRegisterupdate" class="button btn--disebled">Guardar los datos</button>
    </form>
</div>
    `
