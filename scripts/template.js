function PokedexTemplate(element, PokemonID) {

  return `
  <div class="col-2">
        <div class="card " style="width: 18rem;">
          <h5 class="card-title">${element.name}</h5>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${PokemonID}.png" class="card-img-top" alt="...">
        </div>
        </div>
      `;
}
