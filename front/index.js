const inputName = document.getElementById('inputName');
const inputType = document.getElementById('inputType');
const inputImage = document.getElementById('inputImage');
const body = document.getElementById('#table-body');
const table = document.getElementById('main-table');
const form = document.getElementById('main-form');
const container = document.getElementById('main-container');
const pokemons = [];

function showAlert(message, className) {
    let option = [{
        animation : true,
        delay : 2000
    }]
    let toastElement = document.getElementById('myToast');
    toastElement.className = `toast bg-${className}`;
    let textContent = document.getElementById('text-content');
    textContent.innerHTML = message;
    let toasty = new bootstrap.Toast(toastElement, option);
    toasty.show();
}

function cleanInputs() {
    inputName.value = '';
    inputType.value = 'Selecione o Tipo';
    inputImage.value = '';
}

function firstToUpper(string) {
    let newString = string[0].toUpperCase() + string.substr(1);
    return newString;
}

function validateType() {
    let input = document.getElementById('inputType').value;
    if (input === 'Selecione o Tipo') {
        return false;
    }
    return true;
}

function validatePokemon() {
    for (i = 0; i < pokemons.length; i++) {
        if (inputName.value === pokemons[i]) {
            return false;
        }
    }
    pokemons.push(inputName.value);
    return true;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateType()) {
        if (validatePokemon()) {
            postPokemon();
            const row = document.createElement('tr');
            row.innerHTML = `
            <td class="col-3"><img src="${inputImage.value}" width="70px"</td>
            <td class="col-3">${inputName.value}</td>
            <td class="col-3"><span id="type-badge" class="badge badge-dark ${inputType.value.toLowerCase()}">${inputType.value}</span></td>
            <td class="col-3">
                <a href="#" id="delete-button">
                    <i class="fa-sharp fa-solid fa-trash delete" title="lixo"></i>
                </a>
            </td>
            `
            body.appendChild(row);
            cleanInputs();
            showAlert('Pokemon Adicionado', 'success');
        }
        else {
            cleanInputs();
            showAlert('Pokemon já existente!', 'danger');
        }
    }
    else {
        showAlert('Selecione um tipo', 'warning');
    }
})

body.addEventListener('click', (e) => {
    target = e.target;
    const actualRow = target.parentElement.parentElement;
    let isValid = confirm('Deseja deletar o Pokemon?');
    if (!isValid) {
        return;
    }
    if (target.classList.contains('delete')) {
        actualRow.parentElement.remove();
        showAlert('Pokemon removido com sucesso', 'danger');
        pokemons.splice(0, 1);
        for (i = 0; i < pokemons.length; i++) {
            if (pokemons[i] === actualRow.children[1].value) {
                pokemons.splice(i, 1);
                console.log(pokemons)
            }
        }
    }
});

function postPokemon() {
    data = {
        nome: document.getElementById('inputName').value,
        tipo: document.getElementById('inputType').value,
        imagem: document.getElementById('inputImage').value
    }
    fetch("http://localhost:3000/meuspokemons", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then(function (res) { return res.json(); })
        .then(function (data) { alert(JSON.stringify(data)) })
        .catch(err => {
            console.error(err);
        });
}
