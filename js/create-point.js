

function populateUfs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then( res => res.json() )//buscou e transformou em json maneira completa (res) => {return res,jaon}
    .then( states => {
        for(const state of states){
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUfs()

function getCities(event){
    const citysSelect = document.querySelector("select[name=city]")
    let stateInput = document.querySelector("input[name=state]")

    const indexOfSelectedState = event.target.selectedIndex
    stateInput = event.target.options[indexOfSelectedState]

    const ufValue = event.target.value

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url).then( res => res.json() ).then(cities => {
        for( const city of cities){
            citysSelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }

        citysSelect.disabled = false
    })
}

document.querySelector("select[name=uf]")
.addEventListener("change", getCities)