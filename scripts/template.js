function PokedexTemplate(element) {
  //console.log(element);
  
  return `

<!-- Button trigger modal -->
<div type="button" class="col-2 card menu" data-bs-toggle="modal" data-bs-target="#${element.id}exampleModal">
<div class="card-body">
    <h5 class="card-title">${element.name.name}</h5>
</div>
    <img src="${element.sprite.link}" class="card-img-top" alt="Pokemon Sprites">

<div class="row">
  <div class="col-sm-6 mb-3 mb-sm-0">
        <p class="img"> <img src="${element.type.types.type1}" class="card-img" alt="Pokemon Type 1"></p>
  </div>
  <div class="col-sm-6">
        <p class="img"> <img src="${element.type.types.type2}" class="card-img" alt="Pokemon Type 2"></p>

  </div>
</div>

  </div>
  

    <!-- Modal -->
  <div class="modal fade" id="${element.id}exampleModal" tabindex="-1" aria-labelledby="${element.id}exampleModalLabel" aria-hidden="false">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="${element.id}exampleModalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
<div class="card" style="width: 29rem !important;">
  <img src="${element.sprite.link}" class="card-img" alt="Pokemon Sprite">
  <div class="card-body">
    <h5 class="card-title">${element.name.name}</h5>
    <p class="card-text">${element.ability.ability1}</p>
    <p class="card-text">${element.ability.ability2}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">An item</li>
    <li class="list-group-item">Weight: ${element.weight.weight}</li>
    <li class="list-group-item">A third item</li>
  </ul>
  <div class="card-body">
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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