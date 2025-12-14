const maxStats = getMaxStats();

function PokedexTemplate(element) {
  let arr = [
    element.stats[0],
    element.stats[1],
    element.stats[2],
    element.stats[3],
    element.stats[4],
  ];

  const hpPercantage = (element.stats[0] / maxStats.hp) * 100;
  const attackPercantage = (element.stats[1] / maxStats.attack) * 100;
  const defensePercantage = (element.stats[2] / maxStats.defense) * 100;
  const spAttackPercantage =
    (element.stats[3] / maxStats["special-attack"]) * 100;
  const spDefensePercantage =
    (element.stats[4] / maxStats["special-defense"]) * 100;
  const speedPercantage = (element.stats[5] / maxStats.speed) * 100;
  return `
<div type="button" class="text-capitalize col-2 card menu container-md poke-list m-2" id="${
    element.id
  }" data-bs-toggle="modal" data-bs-target="#${element.id}ModalTarget" 
onclick="getAbilityDescription(${element.id})">
  <div class="card-body radial-bg" style="--color1: var(--type${element.types[0]});
      --color2: var(--type${element.types[1] ? element.types[1] : 0})">
    <div class="d-flex">
      <div class="position-absolute text-center"><h5 >${element.name}</h5></div>
      <img src="${
        element.sprite
      }" class="card-img-top position-absolute" alt="Pokemon Sprites">
      <div class="div-color"      ></div> 
      
    </div>
    <div class="card-footer p-0 d-flex justify-content-right">
      <p class="img"> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-vii/lets-go-pikachu-lets-go-eevee/${
        element.types[0]
      }.png" class="" alt=""></p>
      <p class="m-0 img w-112"> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-vii/lets-go-pikachu-lets-go-eevee/${
        element.types[1]
      }.png" class="" alt=""></p>
    </div> 
  </div> 
</div>

<div class="text-capitalize modal fade" id="${
    element.id
  }ModalTarget" tabindex="-1" aria-labelledby="${
    element.id
  }ModalTargetLabel" aria-hidden="false">
  <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="${element.id}ModalTargetLabel">${
    element.name
  }</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h1 class="fs-5">Pokedex #${element.id}</h1>
        <div class="card">
          <div class="background-img">
            <img id="${element.id}modalPic" src="${
    element.sprite
  }" class="card-img-modal mx-auto" alt="Pokemon Sprite">

            <table class="table table-secondary">
  <thead>
    <tr>
      <th scope="col">Stat</th>
      <th scope="col">Base</th>
      <th scope="col">Progress</th>
    </tr>
  </thead>
  <tbody>
    <tr  class="table-info fs-6">
      <td>HP</td>
      <td>${element.stats[0]}</td>
      <td><div class="progress " role="progressbar" value="${
        element.stats[0]
      }" aria-valuemin="0" aria-valuemax="${maxStats.hp}">
                      <div class="progress-bar" style="width: ${hpPercantage}%"></div>
                    </div></td>
    </tr>
    <tr class="table-light fs-6">
      <td>Attack</td>
      <td>${element.stats[1]}</td>
      <td><div class="progress" role="progressbar" aria-valuenow="${
        element.stats[1]
      }" aria-valuemin="0" aria-valuemax="${maxStats.attack}">
                      <div class="progress-bar" style="width: ${attackPercantage}%"></div>
                    </div></td>
    </tr>
    <tr  class="table-info fs-6">
      <td>Defense</td>
      <td>${element.stats[2]}</td>
      <td><div class="progress" role="progressbar" aria-valuenow="${
        element.stats[2]
      }" aria-valuemin="0" aria-valuemax="${maxStats.defense}">
                      <div class="progress-bar" style="width: ${defensePercantage}%"></div>
                    </div></td>
    </tr>
     <tr  class="table-light fs-6">
      <td>Sp. Attack</td>
      <td>${element.stats[3]}</td>
      <td><div class="progress " role="progressbar" aria-valuenow="${
        element.stats[3]
      }" aria-valuemin="0" aria-valuemax="${maxStats["special-attack"]}">
                      <div class="progress-bar" style="width: ${spAttackPercantage}%"></div>
                    </div></td>
    </tr>
     <tr  class="table-info fs-6">
      <td>Sp. Defense</td>
      <td>${element.stats[4]}</td>
      <td><div class="progress " role="progressbar" aria-valuenow="${
        element.stats[4]
      }" aria-valuemin="0" aria-valuemax="${maxStats["special-defense"]}">
                      <div class="progress-bar" style="width: ${spDefensePercantage}%"></div>
                    </div></td>
    </tr>
     <tr  class="table-light fs-6">
      <td>Speed</td>
      <td>${element.stats[5]}</td>
      <td><div class="progress " role="progressbar" aria-valuenow="${
        element.stats[5]
      }" aria-valuemin="0" aria-valuemax="${maxStats.speed}">
                      <div class="progress-bar" style="width: ${speedPercantage}%"></div>
                    </div></td>
    </tr>
  </tbody>
</table>


          </div>
            <div class="row">
              <div class=" mb-sm-0 col-md-3 w-100 p-3 linear-diag-bg" style="--bs-bg-opacity: .5; --color1: var(--type${element.types[0]});
      --color2: var(--type${element.types[1] ? element.types[1] : 0})"
      >
              
                <p class="img">
                  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-vii/lets-go-pikachu-lets-go-eevee/${
                    element.types[0]
                  }.png" alt="${element.types[0]}">
                  ${
                    element.types[1]
                      ? `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-vii/lets-go-pikachu-lets-go-eevee/${element.types[1]}.png" alt="${element.types[1]}">`
                      : ""
                  }
                </p>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" id="${
                    element.id
                  }switchCheckDefault" onclick="togglePic('${
    element.sprite
  }','${element.shiny}','${element.id}')">
                  <label class="form-check-label" for="switchCheckDefault">Switch Sprite</label>
                </div>
              </div>

            <div class="accordion" id="${element.id}accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button collapsed linear-bg fw-bold" style="--color1: var(--type${element.types[0]});
      --color2: var(--type${element.types[1] ? element.types[1] : 0})" type="button" data-bs-toggle="collapse" data-bs-target="#${
                    element.id
                  }collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Overall
                  </button>
                </h2>
                <div id="${
                  element.id
                }collapseTwo" class="accordion-collapse collapse" data-bs-parent="#${
    element.id
  }accordionExample">
                  <div class="accordion-body">
                    <li class="list-group-item">Weight: ${
                      element.weight
                    } <span class="text-lowercase">kg</span></li>
                    <li class="list-group-item">Height: ${
                      element.height
                    } <span class="text-lowercase">cm</span></li>
                    <li class="list-group-item" id="${element.id}title">
                    Ability: ${element.abilities
                      .map(
                        (d) =>
                          `<span class="fst-italic text-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="">${d.name}</span>`
                      )
                      .join(", ")}

                    </li>
                  </div>
                </div>
              </div>

              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button collapsed linear-bg fw-bold" style="--color1: var(--type${element.types[0]});
      --color2: var(--type${element.types[1] ? element.types[1] : 0})" type="button" data-bs-toggle="collapse" data-bs-target="#${
                    element.id
                  }collapseOne" aria-expanded="false" aria-controls="${
    element.id
  }collapseOne">
                    Stat Calculator
                  </button>
                </h2>



                <div id="${
                  element.id
                }collapseOne" class="accordion-collapse collapse" data-bs-parent="#${
    element.id
  }accordionExample">
                  <div class="accordion-body">

                    <label for="range1" class="form-label">Level: <output id="levelFig${
                      element.id
                    }" aria-hidden="true">1</output></label> 
                    
                    <input type="range" for"range1" class="form-range" id="range${
                      element.id
                    }" min="1" max="100" value="1" step="1" oninput="updateLevel(${
    element.id
  })">

                    <div class="progress" role="progressbar" value="${
                      element.stats[0]
                    }" aria-valuemin="0" aria-valuemax="${maxStats.hp}">
                      <li class="list-group-item">HP: <output class="flexStat${
                        element.id
                      }">${element.stats[0]}</output></li>
                      <div class="progress-bar" style="width: ${hpPercantage}%"></div>
                    </div>

                    <div class="progress" role="progressbar" aria-valuenow="${
                      element.stats[1]
                    }" aria-valuemin="0" aria-valuemax="${maxStats.attack}">
                      <li class="list-group-item${
                        element.id
                      }">Attack: <output class="flexStat${element.id}">${
    element.stats[1]
  }</output></li>
                      <div class="progress-bar" style="width: ${attackPercantage}%"></div>
                    </div>

                    <div class="progress" role="progressbar" aria-valuenow="${
                      element.stats[2]
                    }" aria-valuemin="0" aria-valuemax="${maxStats.defense}">
                      <li class="list-group-item${
                        element.id
                      }">Defense: <output class="flexStat${element.id}">${
    element.stats[2]
  }</output></li>
                      <div class="progress-bar" style="width: ${defensePercantage}%"></div>
                    </div>

                    <div class="progress" role="progressbar" aria-valuenow="${
                      element.stats[3]
                    }" aria-valuemin="0" aria-valuemax="${
    maxStats["special-attack"]
  }">
                      <li class="list-group-item${
                        element.id
                      }">Sp. Attack: <output class="flexStat${element.id}">${
    element.stats[3]
  }</output></li>
                      <div class="progress-bar" style="width: ${spAttackPercantage}%"></div>
                    </div>

                    <div class="progress" role="progressbar" aria-valuenow="${
                      element.stats[4]
                    }" aria-valuemin="0" aria-valuemax="${
    maxStats["special-defense"]
  }">
                      <li class="list-group-item${
                        element.id
                      }">Sp. Defense: <output class="flexStat${element.id}">${
    element.stats[4]
  }</output></li>
                      <div class="progress-bar" style="width: ${spDefensePercantage}%"></div>
                    </div>

                    <div class="progress" role="progressbar" aria-valuenow="${
                      element.stats[5]
                    }" aria-valuemin="0" aria-valuemax="${maxStats.speed}">
                      <li class="list-group-item${
                        element.id
                      }">Speed: <output class="flexStat${element.id}">${
    element.stats[5]
  }</output></li>
                      <div class="progress-bar" style="width: ${speedPercantage}%"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div> 
          </div>
        </div>
      </div> 
      <div class="modal-footer d-flex justify-content-between">
        <button type="button" class="btn btn-secondary" onclick="navigateModal('previous', ${
          element.id
        }, getAbilityDescription(${element.id - 1}))">← Previous</button>
        <button type="button" class="btn btn-primary" onclick="navigateModal('next', ${
          element.id
        }, getAbilityDescription(${element.id + 1}))">Next →</button>
      </div>
    </div>
  </div>
</div>
      `;
}
