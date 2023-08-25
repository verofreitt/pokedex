document.addEventListener('DOMContentLoaded', function () {
  const pokemonList = document.getElementById("pokemonList");

  pokemonList.addEventListener('click', function (event) {
    const clickedPokemon = event.target.closest('.pokemon');
    if (clickedPokemon) {
      const pokemonNumber = clickedPokemon.querySelector('.number').textContent.replace('#', '');
      window.location.href = `card-info.html?pokemon=${pokemonNumber}`;
    }
  });

  const loadMoreButton = document.getElementById("loadMoreButton");
  const maxRecords = 151;
  const limit = 8;
  let offset = 0;

  function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
      const newHtml = pokemons
        .map(
          (pokemon) => `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>
    
                <img
                src="${pokemon.photo}"
                alt=${pokemon.name}/>
            </div>
        </li>
        `
        )
        .join("");
      pokemonList.innerHTML += newHtml;
    });
  }

  loadPokemonItens(offset, limit);

  loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNextPage = offset + limit;

    if (qtdRecordsWithNextPage >= maxRecords) {
      const newLimit = maxRecords - offset;
      loadPokemonItens(offset, newLimit);

      loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
      loadPokemonItens(offset, limit);
    }
  });
});

function showPokemonDetails(pokemonNumber) {
  getPokeData(pokemonNumber);
}