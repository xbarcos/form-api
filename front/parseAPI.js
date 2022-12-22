getTipos();
getPokemonsSalvos();

function getTipos() {
    fetch('http://localhost:3000/tipos')
        .then(function (response) {
            return response.json();
        })
        .then(function (resultado) {
            readTipos(resultado);
        });
}

function getPokemonsSalvos() {
    fetch('http://localhost:3000/meuspokemons')
        .then(function (response) {
            return response.json();
        })
        .then(function (resultado) {
            readPoke(resultado);
        });
}
function readPoke(result) {
    const tbody = document.getElementById('#table-body');
    result.forEach(element => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td class="col-3"><img src="${element.imagem}" width="70px"</td>
            <td class="col-3">${element.nome}</td>
            <td class="col-3"><span id="type-badge" class="badge badge-dark ${element.tipo.toLowerCase()}">${element.tipo}</span></td>
            <td class="col-3">
                <a href="#" id="delete-button">
                    <i class="fa-sharp fa-solid fa-trash delete" title="lixo"></i>
                </a>
            </td>
            `
        tbody.appendChild(row);
    });
}

function readTipos(result) {
    const selectType = document.getElementById('inputType');
    result.forEach(element => {
        let option = document.createElement('option');
        option.innerHTML = element;
        option.value = element;
        selectType.appendChild(option);
    })
}

