const selectButtons = document.querySelectorAll('.select-button');

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
        
        resetButtons();

        button.textContent = 'Seleccionado';
        button.style.backgroundColor = '#5bc0de';
        button.style.color = '#fff';
        button.disabled = true;
    });
});

const createCharacterButton = document.getElementById('create-character-button');
createCharacterButton.addEventListener('click', () => {
    window.location.href = 'createCharacter.html';
});