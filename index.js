async function getUsers() {
    const response = await fetch('https://reqres.in/api/users', {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'carbonfootprint1.p.rapidapi.com',
            'x-rapidapi-key': 'your_api_key'
        }
    });

    if (!response.ok) {
        throw new Error(`error ${response.status}`);
    }
    const data = await response.json();
    console.log(data);

    const table = document.getElementById('users');
    const tbody = table.querySelector('tbody');
    data.data.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${user.id}</th>
            <td><img src="${user.avatar}" alt="Avatar" class="img-thumbnail" width="50"></td>
            <td>${user.first_name} ${user.last_name}</td>
            <td>${user.email}</td>
            <td>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#updateModal" onclick="showUsers(${user.id})">Editar</button>
            <button type="button" class="btn btn-danger" onclick="deleteUser(${user.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

getUsers();

async function saveUsers() {
    const response = await fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers: {
            'x-rapidapi-host': 'carbonfootprint1.p.rapidapi.com',
            'x-rapidapi-key': 'your_api_key'
        }
    });

    if (!response.ok) {
        throw new Error(`error ${response.status}`);
    }else{
        const alert = document.getElementById("alert");
        alert.innerHTML = `<div class="alert alert-success" role="alert">
        Usuario registrado! ${response.status}
      </div>`;
    }
    
}

let user = document.getElementById("user");

async function showUsers(id) {
    const response = await fetch('https://reqres.in/api/users/'+id, {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'carbonfootprint1.p.rapidapi.com',
            'x-rapidapi-key': 'your_api_key'
        }
    });
    if (!response.ok) {
        throw new Error(`error ${response.status}`);
    }
    console.log(id);
    const data = await response.json();
    const user = data.data;

    const modalNameInput = document.getElementById('modalName');
    const modalLastnameInput = document.getElementById('modalLastname');
    const modalEmailInput = document.getElementById('modalEmail');

    modalNameInput.value = user.first_name;
    modalLastnameInput.value = user.last_name;
    modalEmailInput.value = user.email;
 
}

async function updateUsers() {
    const response = await fetch('https://reqres.in/api/users/3', {
        method: 'PUT',
        headers: {
            'x-rapidapi-host': 'carbonfootprint1.p.rapidapi.com',
            'x-rapidapi-key': 'your_api_key'
        }
    });
    
    if (!response.ok) {
        throw new Error(`error ${response.status}`);
    }else{
        const update = document.getElementById("update");
        update.innerHTML = `<div class="alert alert-success" role="alert">
        Usuario actualizado ${response.status}!
      </div>`;
    }
    
}

async function deleteUser(id) {
    const response = await fetch('https://reqres.in/api/users/'+id, {
        method: 'DELETE',
        headers: {
            'x-rapidapi-host': 'carbonfootprint1.p.rapidapi.com',
            'x-rapidapi-key': 'your_api_key'
        }
    });
    
    if (!response.ok) {
        throw new Error(`error ${response.status}`);
    }else{
        const error = document.getElementById("error");
        error.innerHTML = `<div class="alert alert-danger" role="alert">
        Usuario eliminado ${response.status}!
      </div>`;
    }
    
}