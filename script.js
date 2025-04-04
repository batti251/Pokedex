const POKE_URL = "https://pokeapi.co/api/v2/";
const POKEPIC_URL = "https://pokeapi.co/api/v2/pokemon/";
let PokemonID = [];
let PokemonIDRef = "";
let string = "";

function init() {
  getPokeAPI("pokemon", 0, 3);
}

/* fetch für Pokemon ID */
async function getPokeAPI(path = "", offset = "", limit = "") {
  const response = await fetch(POKE_URL + path + "/?offset=" + offset + "&limit=" + limit);
  let responseRef = await response.json();
  let PokeAPI = responseRef.results;
  for (let index = 0; index < PokeAPI.length; index++) {
    PokemonIDRef = PokeAPI[index].url.split("/").splice(-2, 1);
    string = PokemonIDRef.toString();
    PokemonID.push(string);
  }
  console.log(PokemonID);
  await getPokeTypes(PokemonID);
  await getPokeStats(PokemonID); 
  await getPokeWeights(PokemonID);
  await getPokeSprite(PokemonID)
  await getPokeAbilities(PokemonID);
   /*getPokeMoves(PokemonID); */
}

async function getPromise(params) {
  
}

async function getPokeTypes(PokemonID) {
  for (let index = 0; index < PokemonID.length; index++) {
    const element = PokemonID[index];
    const response = await fetch(POKEPIC_URL + element);
    let responseRef = await response.json();
    console.log(responseRef);
    let PokeTypes = {
      "id": element,
      "types": {
      "type1": responseRef.types[0].type.name,
      "type2": responseRef.types[1].type.name}
    };
    console.log(PokeTypes);
    }
}

 async function getPokeStats(PokemonID) {
  for (let index = 0; index < PokemonID.length; index++) {
    const element = PokemonID[index];
    const response = await fetch(POKEPIC_URL + element);
    let responseRef = await response.json();
    let PokeStats = {
      "id": element,
      "stats":{
      "hp": responseRef.stats[0].base_stat,
      "attack": responseRef.stats[1].base_stat,
      "defense": responseRef.stats[2].base_stat,
      "special-defense": responseRef.stats[3].base_stat,
      "special-attack": responseRef.stats[4].base_stat,
      "speed": responseRef.stats[5].base_stat}
    };
    console.log(PokeStats);
    }
} 


async function getPokeWeights(PokemonID) {
  for (let index = 0; index < PokemonID.length; index++) {
    const element = PokemonID[index];
    const response = await fetch(POKEPIC_URL + element);
    let responseRef = await response.json();
    let PokeStats = {
      "id": element,
      "weight": responseRef.weight
    };
    console.log(PokeStats);
    }
} 



async function getPokeSprite(PokemonID) {
  for (let index = 0; index < PokemonID.length; index++) {
    const element = PokemonID[index];
    const response = await fetch(POKEPIC_URL + element);
    let responseRef = await response.json();
    let PokeSprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+element+".png"
    console.log(PokeSprite);
    }
} 

async function getPokeAbilities(PokemonID) {
  for (let index = 0; index < PokemonID.length; index++) {
    const element = PokemonID[index];
    const response = await fetch(POKEPIC_URL + element);
    let responseRef = await response.json();
    let PokeAbilities = {
      "id": element,
      "ability1": responseRef.abilities[0].ability.name,
      "ability2": responseRef.abilities[1].ability.name
    };
    console.log(PokeAbilities);
    }
} 


let start = 20;
async function loadMorePokemon() {
  let Button = document.getElementById("loadMoreButton");
  Button.disabled = true;
  await getPokeAPI("pokemon", start, 20);
  start += 20;
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

/* Close Pokecard */
function openPokeCard(x) {
  let PokeCard = document.getElementById("main");
  PokeCard.outerHTML += pokeCardTemplate();
}

/* URL für Type */
/* https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-vii/lets-go-pikachu-lets-go-eevee/3.png */
