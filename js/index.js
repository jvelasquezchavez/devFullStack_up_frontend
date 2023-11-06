const app = document.getElementById("app");

function renderLogin() {
    app.innerHTML = `<h1>Iniciar Sesión</h1>`;
}

function renderHome() {
    app.innerHTML = `<h1>Página Principal</h1>`;
}

function renderCreateCharacter() {
    app.innerHTML = `<h1>Crear Personaje</h1>`;
}

// Manejar las rutas y renderizar vistas correspondientes
function handleRoute() {
    const path = window.location.pathname;

    switch (path) {
        case "/login":
            renderLogin();
            break;
        case "/home":
            renderHome();
            break;
        case "/create-character":
            renderCreateCharacter();
            break;
        default:
            app.innerHTML = `<h1>Ruta no encontrada</h1>`;
    }
}

window.addEventListener("popstate", handleRoute);

handleRoute();