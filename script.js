const POKE_URL = "https://pokeapi.co/api/v2/"

function init() {
    getPokeAPI("pokemon")
    getPokeAPI("")
//    getPokeAPI("pokemon/4/")
//    getPokeAPISprites()
}

async function getPokeAPI(path="",){
    const response = await fetch (POKE_URL+path+"/?offset=0&limit=20")
    let responseRef = await response.json()
    let PokeAPI = responseRef.results;
    console.log(responseRef);
    let mainContent = document.getElementById('main')

    for (let PokeIndex = 0; PokeIndex < PokeAPI.length; PokeIndex++) {
        let element = PokeAPI[PokeIndex];
        mainContent.innerHTML += PokedexTemplate(element,PokeIndex)
    }
}


/* load limited cards (20?) */



/* "load more"-Button
    load next 20 cards /?offset=0&limit=x+${20}
        async function getPokeAPI + new parameter?   
*/

/* get PokemonCards
    get specific url for pokemon v2/pokemon/1  => for Bulbasaur
    onclick overlay PokemonCard
        get several Info in this Card
            which Info? 
                - base stats + 
                - generation encounter?
                - 
            */

