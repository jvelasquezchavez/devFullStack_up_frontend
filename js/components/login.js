const loginButton = document.getElementById('login-button');
const loginForm = document.getElementById('formLogin');

document.addEventListener('DOMContentLoaded', function() {
    console.log("aa");
});

loginForm.addEventListener('submit', async function(e){
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username)
        alert('Por favor, complete el usuario.');
    else if (!password)
        alert('Por favor, complete la contraseña.');
    else{
        const result = await login(username, password);
        if (!result.hasError)
            window.location.href = `../views/home.html?username=${encodeURIComponent(result.data)}`;
        else
            alert(result.data);
    }
}); 

const login = async (username, password)=>{
    const data = {
        email: username,
        password: password,
    };
    
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(data),
    };

    let result = await fetch('http://localhost:5000/endp/auth/login', requestOptions);

    return await result.json();
}

const imageColumnsContainer = document.getElementById('imageColumns');

async function loadImages() {
    try {
        const result = await getImagesFromEndpoint();
        console.log(result);
        
        if (result.hasError || result.data.length == 0)
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
        headers: {'Content-Type': 'application/json'},
    };

    let result = await fetch('http://localhost:5000/endp/character/last', requestOptions);

    return await result.json();

}

loadImages();