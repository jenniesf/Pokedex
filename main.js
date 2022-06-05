// GLOBAL VARIABLES
const poke_container = document.querySelector('#poke_container')
const totalPokemons = 150


// EVENT LISTENERS
document.querySelector('button').addEventListener('click',searchPokemon)
document.querySelector('input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    searchPokemon()
  }
})


// RUN 150 POKEMON CARDS

// Determine the number of Pokemon cards -- orig. 150 Pokemons
async function startFetch (){ 
    for ( let i = 1; i <= totalPokemons ; i++) {
      await getPokemons(i)   //wait till fetch completes before getting another pokemon otherwise pokemons wont load in correct order
    }
}

// RUN POKEMON API FOR FIRST 150
async function getPokemons(id){
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  try {
      const res = await fetch(url)
      const data = await res.json()  
      // console.log(data)
      // console.log(data.name)  
      createAcard(data.name, data.id, data.sprites.front_default , data.types[0].type.name) 
  }
  catch (err) {
      console.error( err  )
  }
}

// create Pokemon card for each 150 Pokemon and render on DOM
function createAcard(pokemon,id,image,type) {
  // create element for each Pokemon card
  const pokemonEl = document.createElement('div')
  // add Class and ID to each Pokemon card
  pokemonEl.classList.add('pokemon')
  pokemonEl.setAttribute("id", pokemon)
  // render each card to DOM
  pokeInnerHTML = `<div class="img-container"> <img src="${image}" alt="${pokemon} image"/></div>   
                        <div class="pokemonID"> #${id.toString().padStart(3, '0')} </div> 
                        <div class="pokemonName"> ${pokemon.charAt(0).toUpperCase() + pokemon.slice(1)} </div>  
                        <div class="pokemonType"> Type: ${type} </div>`
  pokemonEl.innerHTML = pokeInnerHTML
  poke_container.appendChild(pokemonEl)
}

// RUN 150 CARDS ON PAGE LOAD
startFetch()


// SEARCH POKEMON FROM USER INPUT
async function searchPokemon (){
  const pokemon = document.querySelector('input').value.toLowerCase()

  if ( pokemon ) {
    document.querySelector('#searchPokemonContainer').classList.remove('hidden')
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    try {
      const res = await fetch(url)
      const data = await res.json()  
  
      const name = data.name
      const id = data.id
  
      searchPokemonDOM( data.name, data.id, data.sprites.front_default , data.types[0].type.name , data.abilities[0].ability.name, data.moves[0].move.name )
    }
    catch (err) {
      console.error( err  )
    }
  }
}

function searchPokemonDOM(pokemon,id,image,type, abilities , move) {
  document.querySelector('#searchImg').src = `${image}`
  document.querySelector('#searchID').innerText = `#${id.toString().padStart(3,'0')}`
  document.querySelector('#searchName').innerText = `${pokemon.charAt(0).toUpperCase() + pokemon.slice(1)}`
  document.querySelector('#searchType').innerText = `Type: ${type}`

  document.querySelector('#searchAbility').innerText = `Ability: ${abilities}`
  document.querySelector('#searchMove').innerText = `Move: ${move}`
}


