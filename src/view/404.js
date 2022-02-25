const DifferentPage = () =>{
  const viewDifferent = `
            <h2>404 ERROR</h2>
            <h1>Página no encontrada</h1>
          `;

  const divElemt = document.createElement('div');
  divElemt.innerHTML = viewDifferent;
  return divElemt;
};

export default DifferentPage;
