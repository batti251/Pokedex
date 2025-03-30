const POKE_URL = "https://pokeapi.co/api/v2/"

function init() {
    getPokeAPI("pokemon",0,20)

//    getPokeAPI("pokemon/4/")
//    getPokeAPISprites()
}

async function getPokeAPI(path="",offset="",limit=""){
    const response = await fetch (POKE_URL+path+"/?offset="+offset+"&limit="+limit)
    let responseRef = await response.json()
    let PokeAPI = responseRef.results;
    console.log(responseRef);
    let mainContent = document.getElementById('main')
    loopPokemon(PokeAPI, mainContent, offset)
}

function loopPokemon(PokeAPI, mainContent, offset) {
    console.log(offset);
    
        for (let PokeIndex = offset; PokeIndex < PokeAPI.length; PokeIndex++) {
        let element = PokeAPI[PokeIndex];
        mainContent.innerHTML += PokedexTemplate(element,PokeIndex)
    }
}

/* load limited cards (20?) */



/* "load more"-Button
    load next 20 cards /?offset=0&limit=x+${20}
        async function getPokeAPI + new parameter?   
*/
function loadMorePokemon(params) {
    let button = document.getElementById('loadMoreButton')
    console.log(button);
    getPokeAPI("pokemon",20,22)
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

