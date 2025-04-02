const POKE_URL = "https://pokeapi.co/api/v2/";
const POKEPIC_URL = "https://pokeapi.co/api/v2/pokemon/";

function init() {
  getPokeAPI("pokemon", 0, 12);

}

async function getPokeAPI(path = "", offset = "", limit = "") {
  const response = await fetch(
    POKE_URL + path + "/?offset=" + offset + "&limit=" + limit
  );
  let responseRef = await response.json();
  let PokeAPI = responseRef.results;
  let mainContent = document.getElementById("main");
  loopPokemon(PokeAPI, mainContent);
}

async function loopPokemon(PokeAPI, mainContent) {
  for (let PokeIndex = 0; PokeIndex < PokeAPI.length; PokeIndex++) {
    let element = PokeAPI[PokeIndex];
    let PokemonID = element.url.split("/").slice(-2, -1);
    let PokemonInfoSource = await fetch(element.url);
    let newSource = await PokemonInfoSource.json();
    console.log(newSource);
    
    mainContent.innerHTML += PokedexTemplate(
      element,
      PokemonID,
      PokemonInfoSource
    );
  }
}

let start = 12;
async function loadMorePokemon() {
  let Button = document.getElementById("loadMoreButton");
  Button.disabled = true;
  await getPokeAPI("pokemon", start, 12);
  start += 12;
  Button.disabled = false;
}

/* get PokemonCards
    get specific url for pokemon v2/pokemon/1  => for Bulbasaur
    onclick overlay PokemonCard
        get several Info in this Card€
            which Info? 
                - base stats + 
                - generation encounter?
                - 
            */
function openPokeCard(x, PokemonID) {
  let PokeCard = document.getElementById("main");
  PokeCard.outerHTML += pokeCardTemplate(PokemonID);
}
