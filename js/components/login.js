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
        console.log(result);
        if (!result.hasError)
            window.location.href = `../views/home.html?username=${encodeURIComponent(username)}`;
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