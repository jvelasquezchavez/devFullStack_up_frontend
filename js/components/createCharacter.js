// Obtén elementos del DOM
const topSelect = document.getElementById('top-select');
const bottomSelect = document.getElementById('bottom-select');
const shoesSelect = document.getElementById('shoes-select');
const topImage = document.getElementById('top-image');
const bottomImage = document.getElementById('bottom-image');
const shoesImage = document.getElementById('shoes-image');
const selectedCharacterImage = document.getElementById('selected-character');
const outfitOverlay = document.getElementById('outfit-overlay');
const saveOutfitButton = document.getElementById('save-outfit-button');

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