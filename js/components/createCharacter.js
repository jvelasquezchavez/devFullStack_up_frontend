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
selectedCharacterImage.src = `../../imgs/${imagenSeleccionada}.png`;
// Obtén elementos del carrusel de selección de "Parte Superior"
const topCarouselImages = document.querySelectorAll('#top-carousel img');

// Agrega un controlador de eventos de clic a cada imagen en el carrusel
topCarouselImages.forEach(image => {
    image.addEventListener('click', () => {
        // Obtiene la fuente (URL) de la imagen clicada
        const selectedImageSrc = image.getAttribute('src');

        // Asigna la fuente de la imagen de la "Parte Superior" en la vista del atuendo
        topImage.src = selectedImageSrc;
    });
});

// Evento para mostrar la vista del atuendo
function showOutfitView() {
    outfitOverlay.style.display = 'block';
}

// Evento para ocultar la vista del atuendo
function hideOutfitView() {
    outfitOverlay.style.display = 'none';
}

// Evento para actualizar el atuendo cuando se selecciona algo
topSelect.addEventListener('change', () => {
    updateOutfit();
});

bottomSelect.addEventListener('change', () => {
    updateOutfit();
});

shoesSelect.addEventListener('change', () => {
    updateOutfit();
});

volverButton.addEventListener('click', () => {
    window.location.href = '../views/home.html';
});
// Evento para guardar el atuendo
saveOutfitButton.addEventListener('click', () => {
    alert('Atuendo guardado en el sistema.');
    hideOutfitView();
});

// Llama a la función updateOutfit al cargar la página para mostrar el atuendo inicial
updateOutfit();

// Evento para mostrar la vista del atuendo sobre la imagen del personaje
selectedCharacterImage.addEventListener('click', () => {
    showOutfitView();
});
