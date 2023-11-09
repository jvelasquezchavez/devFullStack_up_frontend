// Obtén elementos del DOM

const topSelect = document.getElementById('top-carousel');
const bottomSelect = document.getElementById('bottom-carousel');
const shoesSelect = document.getElementById('shoes-carousel');
const topImage = document.getElementById('top-image');
const bottomImage = document.getElementById('bottom-image');
const shoesImage = document.getElementById('shoes-image');
const selectedCharacterImage = document.getElementById('selected-character');
const outfitOverlay = document.getElementById('outfit-overlay');
const saveOutfitButton = document.getElementById('save-outfit-button');
const volverButton = document.getElementById('comeBack-button');
const urlParams = new URLSearchParams(window.location.search);
const imagenSeleccionada = urlParams.get('imagen');
const tokenExt = imagenSeleccionada.split('=')[1].split('?')[0];
const username = imagenSeleccionada.split('=')[2];
selectedCharacterImage.src = `../../imgs/${imagenSeleccionada.split('?')[0]}.png`;
let selectedTopImage = null;
let selectedBottomImage = null;
let selectedShoesImage = null;

volverButton.addEventListener('click', () => {
    window.location.href = `../views/home.html?username=${encodeURIComponent(username)}?token=${encodeURIComponent(tokenExt)}`;
});

saveOutfitButton.addEventListener('click', async function(e){
    e.preventDefault();
    if (!selectedTopImage)
        alert('Por favor, elija la parte superior.');
    else if (!selectedBottomImage)
        alert('Por favor, elija la parte inferior.');
    else if (!selectedShoesImage)
        alert('Por favor,  elija calzado.');
    else{
        const result = await saveCharacter(selectedTopImage, selectedBottomImage, selectedShoesImage);
        console.log(result);
        if (!result.hasError)
            window.location.href = `../views/home.html?username=${encodeURIComponent(username)}?token=${encodeURIComponent(tokenExt)}`;
        else
            alert(result.data);
    }
});

const saveCharacter = async (selectedTopImage, selectedBottomImage, selectedShoesImage)=>{
    const data = {
        name: imagenSeleccionada.split('?')[0],
        face: imagenSeleccionada.split('?')[0],
        top: selectedTopImage,
        bottom: selectedBottomImage,
        shoes: selectedShoesImage,
        isDefault: false
    };
    
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${tokenExt}`},
        body: JSON.stringify(data),
    };

    let result = await fetch('http://localhost:5000/endp/character', requestOptions);
    
    return await result.json();
}

const topCarousel = document.getElementById('top-carousel');
const bottomCarousel = document.getElementById('bottom-carousel');
const shoesCarousel = document.getElementById('shoes-carousel');

function handleImageClick(event) {
    const filePath = event.target.getAttribute('src');
    if (filePath == null) return;
    const parts = filePath.split('/');
    const selectedImageSrc = parts.pop().split('.')[0];
    const targetCarousel = event.currentTarget;
    if (targetCarousel === topCarousel) {
        selectedTopImage = selectedImageSrc;
    } else if (targetCarousel === bottomCarousel) {
        selectedBottomImage = selectedImageSrc;
    } else if (targetCarousel === shoesCarousel) {
        selectedShoesImage = selectedImageSrc;
    }

    const images = targetCarousel.querySelectorAll('img');
    images.forEach(img => {
        img.classList.remove('selected');
    });
    
    event.target.classList.add('selected');
    mostrarOcultarImagen();
}


function mostrarOcultarImagen() {
    const personaje = document.getElementById('personaje');
    const parteSuperior = document.getElementById('parteSuperior');
    const parteInferior = document.getElementById('parteInferior');
    const zapatos = document.getElementById('zapatos');
    personaje.src = `../../imgs/${imagenSeleccionada.split('?')[0]}.png`;
    personaje.style.display = 'block';

    if (selectedTopImage){
        parteSuperior.style.display = 'block';
        parteSuperior.src = `../../imgs/${selectedTopImage}.png`;
    }
    if (selectedBottomImage){
        parteInferior.style.display = 'block';
        parteInferior.src = `../../imgs/${selectedBottomImage}.png`;
    }
    if (selectedShoesImage){
        zapatos.style.display = 'block';
        zapatos.src = `../../imgs/${selectedShoesImage}.png`;
    }
    
  }

topCarousel.addEventListener('click', handleImageClick);
bottomCarousel.addEventListener('click', handleImageClick);
shoesCarousel.addEventListener('click', handleImageClick);
loadUsername();

function loadUsername() {
    const h1Element = document.getElementById("resultadoUsername");
    h1Element.textContent = 'Hola: ' + username + '. Momento de elegir el atuendo de hoy.';
}