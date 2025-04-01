const POKE_URL = "https://pokeapi.co/api/v2/"
const POKEPIC_URL = "https://pokeapi.co/api/v2/pokemon/"

function init() {
    getPokeAPI("pokemon",0,12)
}

async function getPokeAPI(path="",offset="",limit=""){
    const response = await fetch(POKE_URL+path+"/?offset="+offset+"&limit="+limit)
    let responseRef = await response.json()
    let PokeAPI = responseRef.results;
    let mainContent = document.getElementById('main')
    loopPokemon(PokeAPI, mainContent)    
}

function loopPokemon(PokeAPI, mainContent) {
    console.log(PokeAPI);
    
        for (let PokeIndex = 0; PokeIndex < PokeAPI.length; PokeIndex++) {
        let element = PokeAPI[PokeIndex];
        let PokemonID = element.url.split("/").slice(-2,-1)
        mainContent.innerHTML += PokedexTemplate(element, PokemonID)
    }
}


/* "load more"-Button
    load next 20 cards /?offset=0&limit=x+${20}
        async function getPokeAPI + new parameter?   

        Ich muss quasi das offset immer um den Faktor X (hier 12) kumulieren
        vllt forEach Klick um 12 erhöhen, speichern?
*/
function loadMorePokemon() {
    let button = document.getElementById('loadMoreButton')
    console.log();
    let start = 12
    
    getPokeAPI("pokemon",12,12)
    getPokeAPI("pokemon",24,12)
}



/* get PokemonCards
    get specific url for pokemon v2/pokemon/1  => for Bulbasaur
    onclick overlay PokemonCard
        get several Info in this Card
            which Info? 
                - base stats + 
                - generation encounter?
                - 
            */

