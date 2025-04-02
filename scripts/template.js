function PokedexTemplate(element, PokemonID) {

  return `
  <div class="col-2" onclick="openPokeCard(this,${PokemonID})">
        <div class="card " style="width: 18rem;">
          <h5 class="card-title">${element.name}</h5>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${PokemonID}.png" class="card-img-top" alt="...">
        </div>
        </div>
      `;
}

function pokeCardTemplate(PokemonID) {
  return `
  <div class="position-absolute top-50 start-50 translate-middle w-100 p-3 h-100">
  <div class="card position-absolute top-50 start-50 translate-middle ">
  <div class="card-header">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${PokemonID}.png" class="card-img-top" alt="...">
              <button type="button" class="btn-close" aria-label="Close"></button>
    <ul class="nav nav-tabs card-header-tabs">
      <li class="nav-item">
        <a class="nav-link active" aria-current="true" href="#">Active</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" aria-disabled="true">Disabled</a>
      </li>
    </ul>
  </div>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
</div>
  `
}