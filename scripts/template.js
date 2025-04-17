const maxStats = getMaxStats()
function PokedexTemplate(element) {
  const hpPercantage = element.stats[0] / maxStats.hp * 100;
  const attackPercantage = element.stats[1] / maxStats.attack * 100;
  const defensePercantage = element.stats[2] / maxStats.defense * 100;
  const spAttackPercantage = element.stats[3] / maxStats["special-attack"] * 100;
  const spDefensePercantage = element.stats[4] / maxStats["special-defense"] * 100;
  const speedPercantage = element.stats[5] / maxStats.speed * 100; 

  return `

<!-- Button trigger modal -->
<div type="button" class="col-2 card menu container-md"  id="${element.id}" data-bs-toggle="modal" data-bs-target="#${element.id}exampleModal" style="width: 242px !important; background-color: "">
<div class="card-body">
    <h5 class="card-title">${element.name}</h5>
</div>
    <img src="${element.sprite}" class="card-img-top" alt="Pokemon Sprites">
   
  
<div class="row">
  <div class="col-sm-6 mb-3 mb-sm-0">
        <p class="img"> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-vii/lets-go-pikachu-lets-go-eevee/${element.types[0]}.png" class="" alt=""></p>
  </div>
   <div class="col-sm-6">
        <p class="img"> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-vii/lets-go-pikachu-lets-go-eevee/${element.types[1]}.png" class="" alt=""></p>

  </div>
</div>

  </div>
  

    <!-- Modal -->
  <div class="modal fade" id="${element.id}exampleModal" tabindex="-1" aria-labelledby="${element.id}exampleModalLabel" aria-hidden="false">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="${element.id}exampleModalLabel">${element.name}</h1>
             
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <p><h1 class="fs-5"> Pokedex #${element.id}</h1></p>
<div class="card" style="width: 29rem !important;">
  <img id="${element.id}modalPic" src="${element.sprite}" class="card-img-modal mx-auto" alt="Pokemon Sprite">

  <div class="card-body">


<div class="row">
  <div class="col-sm-6 mb-3 mb-sm-0">
        <p class="img"> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-vii/lets-go-pikachu-lets-go-eevee/${element.types[0]}.png" class="" alt="${element.types}">
       <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-vii/lets-go-pikachu-lets-go-eevee/${element.types[1]}.png" class="" alt=""></p>
       
       <div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" role="switch" id="${element.id}switchCheckDefault" onclick="togglePic('${element.sprite}','${element.shiny}','${element.id}')">
  <label class="form-check-label" for="switchCheckDefault">Switch to shiny</label>
</div>
  </div>
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
              <li class="list-group-item">Weight: ${element.weight} kg</li>
              <li class="list-group-item">Height: ${element.height} cm</li>
              <li class="list-group-item">Ability: ${element.abilities}</li>
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

<div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="${element.stats[0]}" aria-valuemin="0" aria-valuemax="${maxStats.hp}">
            <li class="list-group-item">HP: ${element.stats[0]} </li>
  <div class="progress-bar" style="width: ${hpPercantage}%"></div>
</div>

<div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="${element.stats[1]}" aria-valuemin="0" aria-valuemax="${ maxStats.attack}">
            <li class="list-group-item">Attack: ${element.stats[1]} </li>
  <div class="progress-bar" style="width: ${attackPercantage}%"></div>
</div>

<div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="${element.stats[2]}" aria-valuemin="0" aria-valuemax="${maxStats.defense}">
            <li class="list-group-item">Defense: ${element.stats[2]} </li>
  <div class="progress-bar" style="width: ${defensePercantage}%"></div>
</div>

<div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="${element.stats[3]}" aria-valuemin="0" aria-valuemax="${maxStats["special-attack"]}">
            <li class="list-group-item">Sp. Attack: ${element.stats[3]} </li>
  <div class="progress-bar" style="width: ${spAttackPercantage}%"></div>
</div>

<div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="${element.stats[4]}" aria-valuemin="0" aria-valuemax="${maxStats["special-defense"]}">
            <li class="list-group-item">Sp. Defense: ${element.stats[4]} </li>
  <div class="progress-bar" style="width: ${spDefensePercantage}%"></div>
</div>

<div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="${element.stats[5]}" aria-valuemin="0" aria-valuemax="${maxStats.speed}">
            <li class="list-group-item">Speed: ${element.stats[5]} </li>
  <div class="progress-bar" style="width: ${speedPercantage}%"></div>
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





