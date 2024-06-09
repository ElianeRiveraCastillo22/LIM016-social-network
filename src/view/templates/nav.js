export const templateNav  = ()=>{
    const nav=`
        <figure id="profile" class="nav--section">
            <img class="nav--icon" src="../img/nav/account.svg">
            <figcaption>Perfil</figcaption>
        </figure>
        <figure id="home" class="nav--section">
            <img class="nav--icon" src="../img/nav/home.svg">
            <figcaption>Home</figcaption>
        </figure>
        <figure class="nav--section">
            <img class="nav--icon" src="../img/nav/configuration.svg">
            <figcaption>Configurar</figcaption>
        </figure>
        <figure class="nav--section">
            <img class="nav--icon" id="signout" src="../img/nav/close.svg">
            <figcaption>Close</figcaption>
        </figure>
    `;
    return nav
}
