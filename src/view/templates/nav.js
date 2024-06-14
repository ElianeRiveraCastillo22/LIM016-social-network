export const templateNav  = ()=>{
    const nav=`
        <figure id="profile" class="nav--section">
            <img class="nav--icon" src="../img/nav/account.svg" alt="icon profile">
            <figcaption>Perfil</figcaption>
        </figure>

        <figure id="home" class="nav--section">
            <img class="nav--icon" src="../img/nav/home.svg" alt="icon home">
            <figcaption>Home</figcaption>
        </figure>

        <figure id="update-registration" class="nav--section">
            <img class="nav--icon" src="../img/nav/configuration.svg" alt="icon configuration">
            <figcaption>Configurar</figcaption>
        </figure>

        <figure class="nav--section">
            <img class="nav--icon" id="signout" src="../img/nav/close.svg" alt="icon close">
            <figcaption>Close</figcaption>
        </figure>
    `;
    return nav
}
