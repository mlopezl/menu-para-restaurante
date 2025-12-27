const cards = document.querySelector('.cards');
const categories = document.querySelector('.categories');
const principales = document.getElementById('principales');
const cafeteria = document.getElementById('cafeteria');
const postres = document.getElementById('postres');
const bebidas = document.getElementById('bebidas');
const entradas = document.getElementById('entradas');
let array = Array.from(categories.children);
let activeButton;
let cardId;

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
   fetchData('principales.json', 'principales' );
});

principales.addEventListener('click', () =>{
    fetchData('principales.json', 'principales' );
    removeActiveButton();
    principales.classList.add('active');
});

cafeteria.addEventListener('click', () =>{
    fetchData('cafeteria.json', 'cafeteria');
    removeActiveButton();
    cafeteria.classList.add('active');
});

postres.addEventListener('click', () =>{
    fetchData('postres.json', 'postres');
    removeActiveButton();
    postres.classList.add('active');
});

bebidas.addEventListener('click', () =>{
    fetchData('bebidas.json', 'bebidas');
    removeActiveButton();
    bebidas.classList.add('active');
});

entradas.addEventListener('click', () =>{
    fetchData('entradas.json', 'entradas');
    removeActiveButton();
    entradas.classList.add('active');
});

function findActiveButton(){
  array.forEach(element => {
    if(element.classList.contains('active')){
      activeButton = element.id;
    }
  });
}

function removeActiveButton(){
  array.forEach(element =>{
    element.classList.remove('active');
  })
}

cards.addEventListener('click', (e) =>{
    const card = e.target.closest('.card');
    cardId = card.id;
    console.log(cardId);
    seeDetails();
})

function seeDetails(){
  findActiveButton();
   let body = document.getElementById('body');
   body.innerHTML = '';
    fetch(`${activeButton}.json`)
  .then(response => {
    if (!response.ok) {
      throw new Error("Error al cargar el archivo JSON");
    }
    return response.json();
  })
  .then(data => {
    const menu = data[activeButton];
    menu.forEach(plato => {
      if(plato.id.toString().trim() === cardId.toString().trim()){
        const card = `<article id="${plato.id}" class="card__info">
            <header class="card__info__image">
                <img src="${plato.imagen}" alt="Imagen del platillo">
            </header>
            <h2 class="card__info__title">${plato.nombre}</h2>
            <p class="card__info__description">${plato.descripcion}</p>
            <p class="card__info__price"><strong>Precio: </strong>${plato.precio}</p>
        </article>`;
     body.innerHTML = card;
      }
  });
})
  .catch(error => {
    console.error("Hubo un problema:", error);
  });
}






