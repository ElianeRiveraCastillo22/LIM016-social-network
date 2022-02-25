const join =() => {
  window.location.hash = '#/signIn';
};

const welcome = () => {
  const viewWelcome = `
      <div class="flexBox welcome">
        <div class="messageWelcome">
          <div class="recordTitle">
            <h1>Queer Place</h1>
          </div>

          <p>
          Somos una comunidad inclusiva donde podrás encontrar
          lugares seguros libres de discriminación.
          </p>

        </div>

        <div class="inputWelcome">
          <button id="btnJoin" class="button">
          Únete a nuestra comunidad </button>
        </div>
        <img class="imgWelcome"
        src="./img/The Movement - Together.png" alt="img Welcome">

      </div>
      `;

  const divElemt = document.createElement('div');
  divElemt.setAttribute('class', 'flexSection');
  divElemt.innerHTML = viewWelcome;

  divElemt
      .querySelector('#btnJoin')
      .addEventListener('click', join);

  return divElemt;
};
export default welcome;
