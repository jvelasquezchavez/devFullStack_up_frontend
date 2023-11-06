const loginButton = document.getElementById('login-button');

loginButton.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username)
        alert('Por favor, complete el usuario.');
    else if (!password)
        alert('Por favor, complete la contraseña.');
    else
        window.location.href = `../views/home.html?username=${encodeURIComponent(username)}`;
});
