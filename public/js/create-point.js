

function populateUfs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then( res => res.json() )//buscou e transformou em json maneira completa (res) => {return res,jaon}
    .then( states => {
        for(const state of states){
        ufSelect.innerHTML += `<option value="${state.sigla}">${state.nome}</option>`
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

    citysSelect.innerHTML = "<option>Selecione a Cidade</option>"
    citysSelect.disabled = true

    fetch(url).then( res => res.json() ).then(cities => {
        for( const city of cities){
            citysSelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citysSelect.disabled = false
    })
}

document.querySelector("select[name=uf]")
.addEventListener("change", getCities)


// itens de coleta

let itemsToColect = document.querySelectorAll(".items-grid li")
for(item of itemsToColect){
    item.addEventListener("click", handleSelectedItems)
}
const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItems(event){
    const itemLi = event.target
    itemLi.classList.toggle("selected")//adicionar classes a tag html
    const itemId = itemLi.dataset.id

    let alreadySelected = selectedItems.findIndex( function(item){
        const itemFound = item == itemId
        return itemFound
    })

    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter( item => {
        const itemIsDifferent = item != itemId
        return itemIsDifferent//se estiver selecionado tira 
        })
        selectedItems = filteredItems
    } else {//senao estiver selecionado adiciona
        selectedItems.push(itemId)
    }
  collectedItems.value = selectedItems
}