const inputName = document.getElementById('inputName');
const inputType = document.getElementById('inputType');
const inputImage = document.getElementById('inputImage');
const body = document.getElementById('#table-body');
const table = document.getElementById('main-table');
const form = document.getElementById('main-form');
const container = document.getElementById('main-container');
const pokemons = [];
var edit = false;
var actualRow;


function openModal() {
    let modal = document.getElementById('exampleModal');
    let myModal = new bootstrap.Modal(modal);
    document.getElementById('exampleModalLabel').textContent = 'Adicionar Pokémon';
    cleanInputs();
    myModal.show();
}

function showAlert(message, className) {
    let option = [{
        animation: true,
        delay: 2000
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
            if (edit === true) {
                return true
            }
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
            if (actualRow == null) {
                postPokemon();
                const row = document.createElement('tr');
                row.innerHTML = `
                <td class="col-3"><img src="${inputImage.value}" width="70px"</td>
                <td class="col-3">${inputName.value}</td>
                <td class="col-3"><span id="type-badge" class="badge badge-dark ${inputType.value.toLowerCase()}">${inputType.value}</span></td>
                <td class="col-3">
                    <a>
                        <i href="#" id="edit-button" class="fa-sharp fa-solid fa-edit edit" style="color:yellow;" title="editar"></i>
                        <i href="#" id="delete-button" class="fa-sharp fa-solid fa-trash delete" style="color:red;" title="apagar"></i>
                    </a>
                </td>
                `
                body.appendChild(row);
                cleanInputs();
                showAlert('Pokemon Adicionado', 'success');
            }
            else {
                actualRow.parentElement.children[0].children[0].src = inputImage.value;
                actualRow.parentElement.children[1].textContent = inputName.value;
                actualRow.parentElement.children[2].children[0].className = `badge badge-dark ${inputType.value.toLowerCase()}`;
                actualRow.parentElement.children[2].children[0].innerHTML = inputType.value;
                actualRow = null;
                showAlert("Pokemon Editado com Sucesso", "success");
                edit = false;
            }
            
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
    actualRow = target.parentElement.parentElement;
    if (target.classList.contains('delete')) {
        let isValid = confirm('Deseja deletar o Pokemon?');
        if (!isValid) {
            return;
        }
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
    if (target.classList.contains('edit')) {
        //showAlert('Vai editar o pokemon', 'warning');

        let name = document.getElementById('inputName');
        let image = document.getElementById('inputImage');
        let type = document.getElementById('inputType');
        edit = true;
        openModal();
        exampleModalLabel.textContent = 'Editar Pokémon';
        name.value = actualRow.parentElement.children[1].textContent;
        type.value = actualRow.parentElement.children[2].textContent;
        image.value = actualRow.parentElement.children[0].children[0].src;



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
