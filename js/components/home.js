const selectButtons = document.querySelectorAll('.select-button');
let imagenSeleccionada = '';
const username = urlParams.get('username');
//selectedCharacterImage.src = `../../imgs/${username}.png`;
let isCharacterSelected = false; // Variable para realizar un seguimiento de la selección del personaje

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
        window.location.href = `../views/createCharacter.html?imagen=${encodeURIComponent(imagenSeleccionada)}`;
    } else {
        alert('Por favor, seleccione un personaje antes de continuar.');
    }
});