const POKE_URL = "https://pokeapi.co/api/v2/";
const POKEPIC_URL = "https://pokeapi.co/api/v2/pokemon/";
let collection = []
let description = []
let level = 1
let storeStats = []


function init() {
  getPokeAPI("pokemon/" , 1, 21);
}

/**
 * This function gets the Description from the Pokemon/Ability-API
 * 
 * @param {Number} pokemonId - id from the Pokemons, beginning with 1 
 */
async function getAbilityDescription(pokemonId){
  let pokemonIndex = pokemonId -1
  let array = []
  let object = {}
  await mapAbilities(pokemonIndex, array, object)
  updateAbilityTitle(pokemonId, array)
}


/**
 * This Function maps the fetched Datas from the Ability-API
 * It pulls the english Version
 * 
 * @param {Number} pokemonIndex  - id from the Pokemons, beginning with 1 
 * @param {Array} array - List of created objects during map-method
 * @param {Object} object - individual object for the according ability
 */
async function mapAbilities(pokemonIndex, array, object){
  let abilityArray = collection[pokemonIndex].abilities.map(a => a.ability.url)
 await Promise.all(
    abilityArray.map( async (url) => {
     let data = await fetch(url);
     let newData = await data.json()
     let text = newData['effect_entries'].find(language => language.language.name === 'en')
     object = {
      'name' : newData.name,
      'effect' : text.effect
     }
     array.push(object)
    })
  )
}


/**
 * This function updates the ability-title-attribute in the dialog
 * 
 * @param {Number} pokemonId - id from the Pokemons, beginning with 1 
 * @param {Array} array - List of created objects during map-method
 */
function updateAbilityTitle(pokemonId, array) {
  let abililtyHTMLRef = document.getElementById(pokemonId+'title');
  let abililtyHTML = abililtyHTMLRef.querySelectorAll('span')
   for (let index = 0; index < array.length; index++) {
   abililtyHTML[index].title = array.find(name => name.name == abililtyHTML[index].innerHTML).effect
}
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
  for (let index = 0 ; index < 20; index++, offset++) {
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
    renderPokedex(combo)
    
}



function renderPokedex(combo) {
  let html = "";
  const pokeList = document.getElementById('main');
  for (let index = 0; index < combo.length; index++) {
    html += PokedexTemplate(combo[index]);
  }
  pokeList.innerHTML = html;
  toggleSpinnerButton()
}

let start = 21;
async function loadMorePokemon() {
  await getPokeAPI("pokemon/", start, 21);
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


/**
 * This Function updates the Level, according to the set input-range
 * It also calls further functions, for calculating and rendering new stat-figures
 * 
 * @param {Number} id - Pokedex # of the target Pokemon
 */
function updateLevel(id){
  let calculatedStat = [];
  let input = document.getElementById('range'+id)
  let output =  document.getElementById('levelFig'+id)
  output.textContent = input.value

  calculateNewStats(id,calculatedStat,input)
  updateStatHTML(id, calculatedStat)
}

/**
 * From 19.11.2025: The Calculation does not Include IV, EV and Nature Values !!!
 * 
 * This Function calculates the new Stats according to the targets base-stats and set Level
 * It's calculation is based on calculation from: https://pokemon.fandom.com/wiki/Statistics#Formula
 * 
 * @param {Number} id - Pokedex # of the target Pokemon (needs to be reduced here by 1 for correct index iteration)
 * @param {Array} calculatedStat - collection of the calculated stats based on 2 calculations:
 *                            => HP (hp) = floor(0.01 x (2 x Base + IV + floor(0.25 x EV)) x Level) + Level + 10
 *                            => Other Stats (other) = (floor(0.01 x (2 x Base + IV + floor(0.25 x EV)) x Level) + 5) x Nature
 * @param {*} input - the set Level between 1 and 100 
 */
function calculateNewStats(id,calculatedStat,input) {
  let baseStats = collection[id-1].stats;
  baseStats.forEach((stat,index) => { 
    if (index == 0) {
      let hp = Math.floor(2*Number(stat['base_stat'])/100 * Number(input.value)) + Number(input.value) + 10
      return calculatedStat.splice(index,1,hp)
    } else {
      let other = Math.floor(2*Number(stat['base_stat'])/100 * Number(input.value)) + 5;
      return calculatedStat.splice(index,1,other)
    }
  }
  )
}

/**
 * This Function updates the stat-values in the output field of the list-group-item, according to the set Level 
 * 
 * @param {Number} id - Pokedex # of the target Pokemon 
 * @param {Array} calculatedStat - collection of the calculated stats
 */
function updateStatHTML(id, calculatedStat) {
  let html = document.querySelectorAll('.flexStat'+id)
  html.forEach((element, index) => {
    element.textContent = calculatedStat[index]
  });
  
}



