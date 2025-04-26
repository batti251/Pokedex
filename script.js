const POKE_URL = "https://pokeapi.co/api/v2/";
const POKEPIC_URL = "https://pokeapi.co/api/v2/pokemon/";
let PokemonID = [];

function init() {
  getPokeAPI("pokemon", 0, 15);
}

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
/* fetch für Pokemon ID */
async function getPokeAPI(path = "", offset = "", limit = "") {
  toggleSpinnerButton()

  let PokemonIDRef = "";
  const response = await fetch(POKE_URL + path + "/?offset=" + offset + "&limit=" + limit);
  let responseRef = await response.json();
  let PokeAPI = responseRef.results;
  for (let index = 0; index < PokeAPI.length; index++) {
    PokemonIDRef = PokeAPI[index].url.split("/").splice(-2, 1);
    PokemonID.push(PokemonIDRef.toString());
  }
  await getPokeAPIObj(PokemonID);
 }

async function getDescriptionAPI(combo){
const prepareCombo = combo.map(a => a.abilities)
for (let i = 0; i < prepareCombo.length; i++) {
  const element = prepareCombo[i];
  for (let i2 = 0; i2 < element.length; i2++) {
    const changed = element[i2].url;
    const response = await fetch(changed);
    const responseRef = await response.json();
    const entry = responseRef.effect_entries.find(l => l.language.name === "en")
    combo[i].abilities[i2].description = entry ? entry: "not available"
  }
}
renderPokedex(combo)
}

async function getPokeAPIObj(PokemonID) {
  const promises = PokemonID.map(id => fetch(POKEPIC_URL + id).then(response => response.json()))
  const dataPool = await Promise.all(promises)
   combinedData(dataPool)
}

 function combinedData(dataPool) {
  const combo = dataPool.map(pokemon => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      height: pokemon.height*10,
      weight: pokemon.weight/10,
      abilities: pokemon.abilities.map(d => {return {name:d.ability.name , url: d.ability.url}}),
      sprite: pokemon.sprites.other["official-artwork"]["front_default"],
      shiny: pokemon.sprites.other["official-artwork"]["front_shiny"],
      types: pokemon.types.map(t => t.type.url.split("/").splice(-2, 1)),
      stats: pokemon.stats.map(s => s.base_stat),
/*       moves: pokemon.moves.map(m => m.move.name) */
    }})
    getDescriptionAPI(combo)
}

function renderPokedex(combo) {
  const pokeList = document.getElementById('main');
  pokeList.innerHTML = "";
  let html = "";
  for (let index = 0; index < combo.length; index++) {
    html += PokedexTemplate(combo[index]);
  }
  pokeList.innerHTML = html;
  toggleSpinnerButton()
}

let start = 15;
async function loadMorePokemon() {
  await getPokeAPI("pokemon", start, 15);
  start += 15;
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

function filterPokemon() {
  let input = document.getElementById("searchBar");
  let pokeSearch = document.getElementsByClassName("container-md");
  for (let searchIndex = 0; searchIndex < pokeSearch.length; searchIndex++) {
    const elementRef = pokeSearch[searchIndex];
    const h5 = elementRef.querySelector("h5");
 if (input.value.length >= 3 && h5.innerHTML.includes(input.value) || input.value.length < 3) {
      elementRef.style.display = "block";
    } else {
      elementRef.style.display = "none";
    }
  }
}

function togglePic(sprite,shiny,id) {
  let imgSource = document.getElementById(`${id}modalPic`)
  let check = document.getElementById(`${id}switchCheckDefault`)

  if (check.checked == true) {
    imgSource.src = shiny
  } else {imgSource.src = sprite}
}

function toggleSpinnerButton() {
  const spinner = document.getElementById("loadingSpinner");
  const spinnerParent = document.getElementById('overlaySpinner')
  const button = document.getElementById("loadMoreButton");
  spinner.classList.toggle("collapse");
  spinnerParent.classList.toggle("overlay")
  document.body.classList.toggle("no-scrollbar")
  button.disabled = !button.disabled
}

async function navigateModal(direction, id) {
  const currentModal = bootstrap.Modal.getInstance(document.getElementById(`${id}ModalTarget`));
  currentModal.hide();
  document.activeElement.blur();
  if (direction === 'next') {
    id = id + 1;
  } else {
    id = id - 1;
  }

  const nextModalElement = document.getElementById(`${id}ModalTarget`);
  if (nextModalElement) {
    const nextModal = new bootstrap.Modal(nextModalElement);
    nextModal.show();
  }
}



//Spielwiese mit map()


function getPokeName(dataPool) {
  const info = dataPool.map(info => ({
    name: info.name,
    id: info.id,
    height: info.height, 
    weight: info.weight, 
}));

}

 function getPokeAbilities(dataPool) {
  const abilities = dataPool.map(pokemon => pokemon.abilities.map(a => a.ability.name));

}

function getPokeStats(dataPool) {
const stats = dataPool.map(stats => stats.stats.map(stat => ({
  name: stat.stat.name,
  stat: stat.base_stat,
}))) ;
console.log(stats);

 
}

 function getPokeSprite(dataPool){
  const spriteOfficial = dataPool.map(pokemon => pokemon.sprites.other["official-artwork"]["front_default"])
console.log(spriteOfficial);

}

 function getPokeTypes(dataPool) {
  const types = dataPool.map(pokemon => pokemon.types.map(t => t.type.name));
console.log(types);

}
