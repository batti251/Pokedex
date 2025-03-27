const POKE_URL = "https://pokeapi.co/api/v2/"

function init() {
    getPokeAPI("pokemon")
}

async function getPokeAPI(path="") {
    const response = await fetch (POKE_URL+path+"/?offset=0&limit=60")
    console.log(response);
    const responseRef = await response.json()
    console.log(responseRef);
    console.log(responseRef.results[3]);
    
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

