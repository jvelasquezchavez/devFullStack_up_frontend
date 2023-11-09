const selectButtons = document.querySelectorAll('.select-button');
let imagenSeleccionada = '';
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
let isCharacterSelected = false;
function resetButtons() {
    selectButtons.forEach(button => {
        button.textContent = 'Seleccionar';
        button.style.backgroundColor = '#ff6f61';
        button.style.color = '#fff';
        button.disabled = false;
    });
}

selectButtons.forEach(button => {
    button.addEventListener('click', () => {
        const characterId = button.getAttribute('data-character');
        switch (characterId) {
            case '1':
                imagenSeleccionada = 'thor';
                break;
            case '2':
                imagenSeleccionada = 'ironman';
                break;
            case '3':
                imagenSeleccionada = 'cap';
                break;
            case '4':
                imagenSeleccionada = 'hulk';
                break;
            }

        resetButtons();

        button.textContent = 'Seleccionado';
        button.style.backgroundColor = '#5bc0de';
        button.style.color = '#fff';
        button.disabled = true;
        isCharacterSelected = true; // Marca que se ha seleccionado un personaje
    });
});

const createCharacterButton = document.getElementById('create-character-button');
createCharacterButton.addEventListener('click', () => {
    if (isCharacterSelected) {
        
        window.location.href = `../views/createCharacter.html?imagen=${encodeURIComponent(imagenSeleccionada)}?username=${encodeURIComponent(username)}`;
    } else {
        alert('Por favor, seleccione un personaje antes de continuar.');
    }
});

const exitButton = document.getElementById('exit-button');
exitButton.addEventListener('click', () => { window.location.href = `../views/login.html`; });


const imageColumnsContainer = document.getElementById('imageColumns');

async function loadImages() {
    try {
        const result = await getImagesFromEndpoint();
        console.log(result);
        
        if (result.hasError)
            return `<h3>No hay personajes creados</h3>`;        

        const columnsHTML = result.data.forEach(item => {
            const columnHTML = generateColumn(item);
            const columnElement = document.createElement('div');
            columnElement.classList.add('column');
            columnElement.innerHTML = columnHTML;
            imageColumnsContainer.appendChild(columnElement);
        });
        return `<div class="column">${columnsHTML}</div>`;
    } catch (error) {
        console.error('Error al cargar imágenes:', error);
    }
}

function generateColumn(item) {
    const imageFace = item.face;
    const imageTop = item.top;
    const imageBottom = item.bottom;
    const imageShoes = item.shoes;

    return `
        <div class="image-container">
            <img src="../../imgs/${imageFace}.png" alt="${imageFace}">
            <img src="../../imgs/${imageTop}.png" alt="${imageTop}">
            <img src="../../imgs/${imageBottom}.png" alt="${imageBottom}">
            <img src="../../imgs/${imageShoes}.png" alt="${imageShoes}">
        </div>
    `;
}

async function getImagesFromEndpoint() {
    
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + username},
    };

    let result = await fetch('http://localhost:5000/endp/character/byUser', requestOptions);

    return await result.json();

}

loadImages();