
function popularUfs() {

    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => {return res.json()})
   //.then ( res => res.jason())
    .then( states => {
        for( const state of states ){

             ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
       
    })
}

popularUfs()

function getCities(event){
    const citySelect = document.querySelector("[name=city]")

    const stateInput = document.querySelector("[name=state]")

    //console.log(event.target.value)

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex 
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value=>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then ( res => res.json() )
    .then( cities => {
        for( const city of cities ){

             citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}

document
   .querySelector("select[name=uf]")
   .addEventListener("change", getCities)

   // Itens de coleta 

   const itensToCollect = document.querySelectorAll(".itens_grid li")
   for (const item of itensToCollect){
       item.addEventListener("click", handleSelectedItem)
   }

   const collectedItems = document.querySelector("input[name=items]")
   let selectedItems = []

   function handleSelectedItem(event){

    //adicionar ou remover uma classe com java script

       const itemLi = event.target

       itemLi.classList.toggle("selected")

       const itemId = event.target.dataset.id
       //console.log(itemId)

       //verificar itens add

       const alreadySelected = selectedItems.findIndex(item => {
           const itemFound = item == itemId // sera true ou false
           return itemFound

       })
       //console.log(alreadySelected)

       if(alreadySelected >= 0 ){
           //tirar da selecao 
           const filteredItems = selectedItems.filter(item => {
               const itemIsDifferent = item != itemId //false
               return itemIsDifferent
           })

           selectedItems = filteredItems

          // console.log(filteredItems)

    } else {
        //se nao estiver selecionado add na lista 
        // adicionado a selecao
        selectedItems.push(itemId)
    }
    //console.log(selectedItems)
    collectedItems.value = selectedItems


       
   }
