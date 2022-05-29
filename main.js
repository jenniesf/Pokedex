const poke_container = document.querySelector('#poke_container')
const totalPokemons = 150

async function startFetch (){ 
    for ( let i = 1; i <= totalPokemons ; i++) {
      await getPokemons(i)   //wait till fetch completes before getting another pokemon otherwise pokemons wont load in correct order
    }
}

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

function createAcard(pokemon,id,image,type) {
  const pokemonEl = document.createElement('div')
  pokemonEl.classList.add('pokemon')
  pokemonEl.setAttribute("id", pokemon)
  
  const pokeInnerHTML = `<div class="img-container"> <img src="${image}" alt="${pokemon} image"/></div>   
                        <div class="pokemonID"> #${id.toString().padStart(3, '0')} </div> 
                        <div class="pokemonName"> ${pokemon.charAt(0).toUpperCase() + pokemon.slice(1)} </div>  
                        <div class="pokemonType"> Type: ${type} </div>`
  
  pokemonEl.innerHTML = pokeInnerHTML
  poke_container.appendChild(pokemonEl)
}


startFetch()