const cards = document.querySelector('.cards');
const principal = document.getElementById('principal');
const cafeteria = document.getElementById('cafeteria');
const postres = document.getElementById('postres');
const bebidas = document.getElementById('bebidas');
const entradas = document.getElementById('entradas');

function fetchData(file, dataType){
    cards.innerHTML = '';
    fetch(file)
  .then(response => {
    if (!response.ok) {
      throw new Error("Error al cargar el archivo JSON");
    }
    return response.json();
  })
  .then(data => {
    const menu = data[dataType];
    menu.forEach(plato => {
      const card = `<article id="${plato.id}" class="card">
            <header class="card__image">
                <img src="${plato.imagen}" alt="Imagen del platillo">
            </header>
            <h2 class="card__title">${plato.nombre}</h2>
            <p class="card__price">Precio: ${plato.precio}</p>
            <button class="card__details">Ver Detalles</button>
        </article>`;
     cards.innerHTML += card;
  });
})
  .catch(error => {
    console.error("Hubo un problema:", error);
  });
}

window.addEventListener('load', () =>{
   fetchData('principales.json', 'menu' );
});

principal.addEventListener('click', () =>{
    fetchData('principales.json', 'menu' );
});

cafeteria.addEventListener('click', () =>{
    fetchData('cafeteria.json', 'cafeteria');
});

postres.addEventListener('click', () =>{
    fetchData('postres.json', 'postres');
});

bebidas.addEventListener('click', () =>{
    fetchData('bebidas.json', 'bebidas');
});

entradas.addEventListener('click', () =>{
    fetchData('entradas.json', 'entradas');
});








