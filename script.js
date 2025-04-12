const POKE_URL = "https://pokeapi.co/api/v2/";
const POKEPIC_URL = "https://pokeapi.co/api/v2/pokemon/";
const POKETYPE_URL = "https://pokeapi.co/api/v2/type/";
let PokemonID = [];

function init() {
  getPokeAPI("pokemon", 0, 20);
}

/* fetch für Pokemon ID */
async function getPokeAPI(path = "", offset = "", limit = "") {
  let PokemonIDRef = "";
  let string = "";
  const response = await fetch(
    POKE_URL + path + "/?offset=" + offset + "&limit=" + limit
  );
  let responseRef = await response.json();
  let PokeAPI = responseRef.results;
  for (let index = 0; index < PokeAPI.length; index++) {
    PokemonIDRef = PokeAPI[index].url.split("/").splice(-2, 1);
    string = PokemonIDRef.toString();
    PokemonID.push(string);
  }
  loadDataReturns();
}

async function loadDataReturns() {
  let spinner = document.getElementById("loadingSpinner");
  spinner.classList.toggle("collapse");
  let Button = document.getElementById("loadMoreButton");
  Button.disabled = true;
  const [types, stats, weights, sprites, abilities, names] = await Promise.all([
    getPokeTypes(PokemonID),
    getPokeStats(PokemonID),
    getPokeWeights(PokemonID),
    getPokeSprite(PokemonID),
    getPokeAbilities(PokemonID),
    getPokeNames(PokemonID),
  ]);
  getData(types, stats, weights, sprites, abilities, names);
  spinner.classList.toggle("collapse");
  Button.disabled = false;
}

function getData(types, stats, weights, sprites, abilities, names) {
  const combinedeData = PokemonID.map((id) => {
    const type = types.find((type) => type.id === id);
    const stat = stats.find((stat) => stat.id === id);
    const weight = weights.find((weight) => weight.id === id);
    const sprite = sprites.find((sprite) => sprite.id === id);
    const ability = abilities.find((ability) => ability.id === id);
    const name = names.find((name) => name.id === id);
    return {
      id,
      name,
      type,
      stat,
      weight,
      sprite,
      ability,
    };
  });

  renderTemplate(combinedeData);
}

function renderTemplate(combinedeData) {
  let pokeList = document.getElementById("main");
  pokeList.innerHTML = "";
  for (let index = 0; index < combinedeData.length; index++) {
    const element = combinedeData[index];
    pokeList.innerHTML += PokedexTemplate(element);
  }
}

async function getPokeNames(PokemonID) {
  let nameArray = [];
  for (let index = 0; index < PokemonID.length; index++) {
    const element = PokemonID[index];
    const response = await fetch(POKEPIC_URL + element);
    let responseRef = await response.json();
    let pokeName = {
      id: element,
      name: responseRef.name,
    };
    nameArray.push(pokeName);
  }
  return nameArray;
}

async function getPokeStats(PokemonID) {
  let statsArray = [];
  for (let index = 0; index < PokemonID.length; index++) {
    const element = PokemonID[index];
    const response = await fetch(POKEPIC_URL + element);
    let responseRef = await response.json();
    let PokeStats = {
      id: element,
      stats: {
        hp: responseRef.stats[0].base_stat,
        attack: responseRef.stats[1].base_stat,
        defense: responseRef.stats[2].base_stat,
        "special-attack": responseRef.stats[3].base_stat,
        "special-defense": responseRef.stats[4].base_stat,
        speed: responseRef.stats[5].base_stat,
      },
    };
    statsArray.push(PokeStats);
  }
  return statsArray;
}

async function getPokeWeights(PokemonID) {
  let weights = [];
  for (let index = 0; index < PokemonID.length; index++) {
    const element = PokemonID[index];
    const response = await fetch(POKEPIC_URL + element);
    let responseRef = await response.json();
    let pokeWeight = {
      id: element,
      weight: responseRef.weight / 10,
      height: responseRef.height * 10,
    };
    weights.push(pokeWeight);
  }
  return weights;
}

async function getPokeSprite(PokemonID) {
  let sprites = [];
  for (let index = 0; index < PokemonID.length; index++) {
    const element = PokemonID[index];
    const response = await fetch(POKEPIC_URL + element);
    await response.json();
    let PokeSprite = {
      id: element,
      link:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" +
        element +
        ".png",
    };
    sprites.push(PokeSprite);
  }
  return sprites;
}

async function getPokeTypes(PokemonID) {
  let typeArray = [];
  for (let index = 0; index < PokemonID.length; index++) {
    const element = PokemonID[index];
    const response = await fetch(POKEPIC_URL + element);
    let responseRef = await response.json();
    let PokeTypes = {
      id: element,
      types: {
        type1: responseRef.types[0].type.url,
        type2: responseRef.types[1]? responseRef.types[1].type.url: responseRef.types[0].type.url,
        species: responseRef.species.url,
      },
    };

    const response1 = await fetch(PokeTypes.types.type1);
    let responseRef1 = await response1.json();
    const response2 = await fetch(PokeTypes.types.type2);
    let responseRef2 = await response2.json();
    const response3 = await fetch(PokeTypes.types.species);
    let responseRef3 = await response3.json();
    PokeTypes = {
      id: element,
      types: {
        type1:
          responseRef1.sprites["generation-vii"][
            "lets-go-pikachu-lets-go-eevee"
          ].name_icon,
        type2:
          responseRef2.sprites["generation-vii"][
            "lets-go-pikachu-lets-go-eevee"
          ].name_icon,
        species: responseRef3.color.name,
      },
    };
    typeArray.push(PokeTypes);
  }
  return typeArray;
}

async function getPokeAbilities(PokemonID) {
  let abilities = [];
  for (let index = 0; index < PokemonID.length; index++) {
    const element = PokemonID[index];
    const response = await fetch(POKEPIC_URL + element);
    let responseRef = await response.json();
    let PokeAbilities = {
      id: element,
      ability1: responseRef.abilities[0].ability.name,
      ability2: responseRef.abilities[1]
        ? responseRef.abilities[1].ability.name
        : "",
      ability3: responseRef.abilities[2]
        ? responseRef.abilities[2].ability.name
        : "",
    };
    abilities.push(PokeAbilities);
  }
  return abilities;
}

let start = 20;
async function loadMorePokemon() {
  await getPokeAPI("pokemon", start, 20);
  start += 20;
}

function getMaxStats() {
  const maxStats = {
    hp: 255,
    attack: 190,
    defense: 250,
    "special-attack": 194,
    "special-defense": 250,
    speed: 200,
  };
  return maxStats;
}

function filterPokemon(){
let input = document.getElementById('searchBar')
let pokeSearch = document.getElementsByClassName('container-md')
for (let searchIndex = 0; searchIndex < pokeSearch.length; searchIndex++) {
  const elementRef = pokeSearch[searchIndex];
  const h5Ref = elementRef.querySelector("h5")
  const h5 = h5Ref.innerHTML
  if (input.value.length < 3) {
  elementRef.style.display = "block"
  }
  else if (input.value.length >= 3  && h5.includes(input.value)) {
   elementRef.style.display = "block"
  }
  else {
    elementRef.style.display = "none"
  }
  } 
}

/* To-Do's */

//more Pokeinfo
  //evolution? 
  //attacks?
  //shiny sprites?

//optimize functions

//styling
  //grid template 
  //card background + overall styling