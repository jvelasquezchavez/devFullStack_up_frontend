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
const username = urlParams.get('username');
selectedCharacterImage.src = `../../imgs/${imagenSeleccionada.split('?')[0]}.png`;
let selectedTopImage = null;
let selectedBottomImage = null;
let selectedShoesImage = null;

volverButton.addEventListener('click', () => {
    window.location.href = '../views/home.html';
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
            window.location.href = `../views/home.html?username=${encodeURIComponent(username)}`;
        else
            alert(result.data);
    }
});

const saveCharacter = async (selectedTopImage, selectedBottomImage, selectedShoesImage)=>{
    const filePath = selectedCharacterImage.src;
    const parts = filePath.split('/');
    const selectedImageSrc = parts.pop().split('.')[0];
    const data = {
        name: imagenSeleccionada,
        face: selectedImageSrc,
        top: selectedTopImage,
        bottom: selectedBottomImage,
        shoes: selectedShoesImage,
        isDefault: false
    };
    
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiZW1haWxAcHJ1ZWJhMi5jb20iLCJuYW1lIjoiUmV5IGxlb24iLCJsYXN0bmFtZSI6Ik11ZmFzYSIsImlzQWN0aXZlIjp0cnVlLCJyb2xlcyI6WyJ1c2VyIl0sImNyZWF0ZWRBdCI6IjIwMjMtMTEtMDRUMDc6NDM6MjEuOTgxWiIsInVwZGF0ZWRBdCI6IjIwMjMtMTEtMDRUMDc6NDM6MjEuOTgxWiIsIl9fdiI6MCwiaWQiOiI2NTQ1ZjYxOWFhMGIwZTFhNTZmNmVkMjkifSwiaWF0IjoxNjk5MzI1MDM5LCJleHAiOjE2OTk0MTE0Mzl9.flLQl47e_i8RbIJRdZ7LTMuQdXpcf08NL6-Yn382XZw'},
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
}

topCarousel.addEventListener('click', handleImageClick);
bottomCarousel.addEventListener('click', handleImageClick);
shoesCarousel.addEventListener('click', handleImageClick);