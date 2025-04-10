const maxStats = getMaxStats()
function PokedexTemplate(element) {
  const hpPercantage = element.stat.stats.hp / maxStats.hp * 100;
  const defensePercantage = element.stat.stats.defense / maxStats.defense * 100;
  const attackPercantage = element.stat.stats.attack / maxStats.attack * 100;
  const spAttackPercantage = element.stat.stats["special-attack"] / maxStats["special-attack"] * 100;
  const spDefensePercantage = element.stat.stats["special-defense"] / maxStats["special-defense"] * 100;
  const speedPercatnage = element.stat.stats.speed / maxStats.speed * 100;


  return `

<!-- Button trigger modal -->
<div type="button" class="col-2 card menu container-md" data-bs-toggle="modal" data-bs-target="#${element.id}exampleModal" style="width: 242px !important; background-color: ${element.type.types.species}">
<div class="card-body">
    <h5 class="card-title">${element.name.name}</h5>
</div>
    <img src="${element.sprite.link}" class="card-img-top" alt="Pokemon Sprites">

<div class="row">
  <div class="col-sm-6 mb-3 mb-sm-0">
        <p class="img"> <img src="${element.type.types.type1}" class="" alt="Pokemon Type 1"></p>
  </div>
  ${element.type.types.type2 != element.type.types.type1 ? ` <div class="col-sm-6">
        <p class="img"> <img src="${element.type.types.type2}" class="" alt="Pokemon Type 2"></p>

  </div>`:''}
</div>

  </div>
  

    <!-- Modal -->
  <div class="modal fade" id="${element.id}exampleModal" tabindex="-1" aria-labelledby="${element.id}exampleModalLabel" aria-hidden="false">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="${element.id}exampleModalLabel">${element.name.name}</h1>
             
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <p><h1 class="fs-5"> Pokedex #${element.id}</h1></p>
<div class="card" style="width: 29rem !important;">
  <img src="${element.sprite.link}" class="card-img-modal mx-auto" alt="Pokemon Sprite">

  <div class="card-body">


<div class="row">
  <div class="col-sm-6 mb-3 mb-sm-0">
        <p class="img"> <img src="${element.type.types.type1}" class="" alt="Pokemon Type 1"></p>
  </div>
  ${element.type.types.type2 != element.type.types.type1 ? ` <div class="col-sm-6">
        <p class="img"> <img src="${element.type.types.type2}" class="" alt="Pokemon Type 2"></p>

  </div>`:''}
</div>

  <div class="accordion" id="${element.id}accordionExample">


  
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Overall
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#${element.id}accordionExample">
      <div class="accordion-body">
              <li class="list-group-item">Weight: ${element.weight.weight} kg</li>
              <li class="list-group-item">Height: ${element.weight.height} cm</li>
              <li class="list-group-item">Ability: ${element.ability.ability1}
              ${element.ability.ability2 ? `,  ${element.ability.ability2} `:''}
              ${element.ability.ability3 ? `,  ${element.ability.ability3} `:''}</li>
     </div>
    </div>
  </div>



  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
        Stats
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#${element.id}accordionExample">
      <div class="accordion-body">

<div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="${element.stat.stats.hp}" aria-valuemin="0" aria-valuemax="${maxStats.hp}">
            <li class="list-group-item">HP: ${element.stat.stats.hp} </li>
  <div class="progress-bar" style="width: ${hpPercantage}%"></div>
</div>

<div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="${element.stat.stats.attack}" aria-valuemin="0" aria-valuemax="${maxStats.attack}">
            <li class="list-group-item">Attack: ${element.stat.stats.attack}</li>
  <div class="progress-bar" style="width: ${attackPercantage}%"></div>
</div>

<div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="${element.stat.stats.defense}" aria-valuemin="0" aria-valuemax="${maxStats.defense}">
            <li class="list-group-item">Defense: ${element.stat.stats.defense} </li>
  <div class="progress-bar" style="width: ${defensePercantage}%"></div>
</div>

<div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="${element.stat.stats["special-attack"]}" aria-valuemin="0" aria-valuemax="${maxStats["special-attack"]}">
            <li class="list-group-item">Sp. Attack: ${element.stat.stats["special-attack"]}</li>
  <div class="progress-bar" style="width: ${spAttackPercantage}%"></div>
</div>

<div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="${element.stat.stats["special-defense"]}" aria-valuemin="0" aria-valuemax="${maxStats["special-defense"]}">
            <li class="list-group-item">Sp. Defense: ${element.stat.stats["special-defense"]}</li>
  <div class="progress-bar" style="width: ${spDefensePercantage}%"></div>
</div>

<div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="${element.stat.stats.speed}" aria-valuemin="0" aria-valuemax="${maxStats.speed}">
            <li class="list-group-item">Speed: ${element.stat.stats.speed}</li>
  <div class="progress-bar" style="width: ${speedPercatnage}%"></div>
</div>

      </div>
      </div>
    </div>



  </div>


          </div>
          
        </div>

        
        </div>
      </div>  
          
        </div>
      </div>

      `;
}

/* 
function PokedexTemplate(element) {
  return `
  <div  class="col-2 " onclick="openPokeCard(this,'${element.sprite.link}')">
   <div class="card menu" style="width: 18rem;">
          <h5 class="card-title">${element.name.name}</h5>
            <img src=${element.sprite.link} class="card-img-top" alt="...">

    <p class="card-text">
     <img src="" class="card-img-top" alt="...">${element.type.types.type1}
     <img src="" class="card-img-top" alt="...">${element.type.types.type2}
    </p>

    </div>
        </div>
      `;
} */




