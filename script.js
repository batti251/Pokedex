const POKE_URL = "https://pokeapi.co/api/v2/";
const POKEPIC_URL = "https://pokeapi.co/api/v2/pokemon/";
let collection = []


function init() {
  getPokeAPI("pokemon/" , 1, 21);
}

/**
 * This Function fetches the Pokemon Data, according to the set parameters.
 * It pushes each POkemon Data as Object into a Collection-Array 
 * @param {String} path - Group of the API 
 * @param {Number} offset - index from the URL, to get according Pokemon
 * @param {Number} limit - total amount of requests
 */
async function getPokeAPI(path = "" ,offset = "", limit = ""){
  toggleSpinnerButton()
  for (offset; offset < limit; offset++) {
     let newResponse = await fetch(POKE_URL + path + offset)
     let newResponseRef = await newResponse.json();
      collection.push(newResponseRef)
  }
  combinedData(collection);
}


const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))


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
    }})
    getDescriptionAPI(combo)
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

let start = 21;
let neWLimit = 41
async function loadMorePokemon() {
  await getPokeAPI("pokemon/", start, neWLimit);
  start += 20;
  neWLimit += 20;
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