/*
Riprendiamo l'esercizio carosello e rifacciamolo, questa volta usando gli oggetti,
prendendo come riferimento il codice scritto oggi insieme a lezione, che trovate in allegato
Modifichiamo il codice dell'esercizio per renderlo funzionante con un array di oggetti, con una sola regola:
non è possibile modificare l'HTML ma solamente JS e CSS. Ricordiamo sempre l'importanza dell'integrità del dato.

Bonus:
E se volessi un bottone per invertire la "direzione" del carosello nell'avanzamento automatico?
*/

console.log('JS OK!');


/*
creare un carousel di immagini
le immagini sono in un array (array di stringhe)
pulsanti avanti indietro
aggiungere le thumb (la thumb attiva sarà distinguibile dalle altre)
dopo 5 secondi la slide avanza automaticamente
*/
// settings
const CHANGE_IMAGE_DELAY = 5;

// Dati array:
const imagesObject = [
    {
        url: 'http://www.viaggiareonline.it/wp-content/uploads/2014/11/sweden_148857365.jpg',
        title: 'Svezia',
        description: '1 - Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
    {
        url: 'https://static1.evcdn.net/images/reduction/1513757_w-1920_h-1080_q-70_m-crop.jpg',
        title: 'Perù',
        description: '2 - Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
    {
        url: 'https://img.itinari.com/pages/images/original/0d3ed180-d22d-48e8-84df-19c4d888b41f-62-crop.jpg?ch=DPR&dpr=2.625&w=1600&s=7ebd4b5a9e045f41b4e0c7c75d298d6c',
        title: 'Chile',
        description: '3 - Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
    {
        url: 'https://static1.evcdn.net/images/reduction/1583177_w-1920_h-1080_q-70_m-crop.jpg',
        title: 'Argentina',
        description: '4 - Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
    {
        url: 'https://cdn.sanity.io/images/24oxpx4s/prod/ed09eff0362396772ad50ec3bfb728d332eb1c30-3200x2125.jpg?w=1600&h=1063&fit=crop',
        title: 'Colombia',
        description: '5 - Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
];

const images = createImageArray(imagesObject);

let activeIndex = 0;
buildCarousel(images, imagesObject, activeIndex);

let idInterval = setInterval(moveCarouselForward, CHANGE_IMAGE_DELAY * 1000);

const leftArrowButton = document.getElementById('left-arrow');
const rightArrowButton = document.getElementById('right-arrow');

leftArrowButton.addEventListener('click', moveCarouselPrevious);
rightArrowButton.addEventListener('click', moveCarouselForward);

// Bonus:
// E se volessi un bottone per invertire la "direzione" del carosello nell'avanzamento automatico?
const container = document.querySelector(".container");
const buttonRewind = document.createElement("button");
buttonRewind.classList.add("buttonCarouselRewind");
buttonRewind.innerHTML = "Rewind";

buttonRewind.addEventListener("click", function(){
    clearInterval(idInterval);
    setInterval(function(){
        activeIndex = activeIndex > 0 ? activeIndex - 1 : images.length - 1;
        buildCarousel(images, imagesObject, activeIndex);
    }, CHANGE_IMAGE_DELAY * 1000);
    buttonRewind.disabled = true;
});

container.append(buttonRewind);

function moveCarouselForward() {
    clearInterval(idInterval)
    // se l'indice si trova in fondo allora lo riposizione all'inizio dell'array
    activeIndex = activeIndex < images.length - 1 ? activeIndex + 1 : 0;
    buildCarousel(images, imagesObject, activeIndex);
    idInterval = setInterval(moveCarouselForward, CHANGE_IMAGE_DELAY * 1000);
}

function moveCarouselPrevious() {
    clearInterval(idInterval)
    // se l'indice è in prima posizione si valorizza all'ultima posizione dell'array
    activeIndex = activeIndex > 0 ? activeIndex - 1 : images.length - 1;
    buildCarousel(images, imagesObject, activeIndex);
    idInterval = setInterval(moveCarouselForward, CHANGE_IMAGE_DELAY * 1000);
}

function buildCarousel(urls, object, activeIndex) {
    const carouselImages = document.querySelector('.carousel-images');
    const carouselThumbs = document.querySelector('.carousel-thumbs');
    let contentImage = '';
    let contentThumb = '';

    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        const imageClass = i === activeIndex ? 'carousel-img active' : 'carousel-img'
        contentImage += `<img class="${imageClass}" src="${url}" alt="${object[i].title}"/><p class="${imageClass}">${object[i].description}</p>`;
        contentThumb += `<img class="${imageClass}" src="${url}" alt="${object[i].title}"/>`;
    }


    // console.log({content});
    carouselImages.innerHTML = contentImage;
    carouselThumbs.innerHTML = contentThumb;
}

function createImageArray(objectArray) {
    const images = [];
    for (let i = 0; i < objectArray.length; i++) {
        const url = objectArray[i].url;
        images.push(url);
    }

    return images;
}