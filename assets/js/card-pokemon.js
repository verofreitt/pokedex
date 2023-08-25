const typeColor = {
    bug: "#f8d5a3",
    dragon: "#97b3e6",
    electric: "#FCF7DE",
    fairy: "#fceaff",
    fighting: "#E6E0D4",
    fire: "#fca8a8",
    flying: "#F5F5F5",
    grass: "#DEFDE0",
    ground: "#f4e7da",
    ghost: "#ebc2c2",
    ice: "#DEF3FD",
    normal: "#f0e8e8",
    poison: "#c4add6",
    psychic: "#eaeda1",
    rock: "#d5d5d4",
    water: "#c9ecfc",
  };
  const url = "https://pokeapi.co/api/v2/pokemon/";
  const card = document.getElementById("card");
  const goBackButton = document.getElementById("goBackButton");
  
  function getPokeData(pokemonId) {
    const finalUrl = url + pokemonId;
  
    fetch(finalUrl)
      .then((response) => response.json())
      .then((data) => {
        generateCard(data);
      })
      .catch((error) => {
        console.error("Error fetching Pokemon data:", error);
      });
  }
  
  function generateCard(data) {
    const card = document.getElementById("card");
  
    const hp = data.stats[0].base_stat;
    const imgSrc = data.sprites.other.dream_world.front_default;
    const pokeName =
      data.name.charAt(0).toUpperCase() + data.name.slice(1);
    const statAttack = data.stats[1].base_stat;
    const statDefense = data.stats[2].base_stat;
    const statSpeed = data.stats[5].base_stat;
  
    const themeColor = typeColor[data.types[0].type.name];
    card.innerHTML = `
      <p class="hp">
        <span>HP</span>
        ${hp}
      </p>
      <img src="${imgSrc}" />
      <h2 class="poke-name">${pokeName}</h2>
      <div class="types">
        <!-- Aqui é onde os tipos serão adicionados -->
      </div>
      <div class="stats">
        <div>
          <h3>${statAttack}</h3>
          <p>Attack</p>
        </div>
        <div>
          <h3>${statDefense}</h3>
          <p>Defense</p>
        </div>
        <div>
          <h3>${statSpeed}</h3>
          <p>Speed</p>
        </div>
      </div>
    `;
    appendTypes(data.types);
    styleCard(themeColor);
  }
  
  function appendTypes(types) {
    const typesContainer = document.querySelector(".types");
    typesContainer.innerHTML = ""; // Limpa os tipos anteriores
    types.forEach((item) => {
      let span = document.createElement("span");
      span.textContent = item.type.name;
      typesContainer.appendChild(span);
    });
  }
  
  function styleCard(color) {
    const card = document.getElementById("card");
  
    card.style.background = `${color}`;
    card.querySelectorAll(".types span").forEach((typeColor) => {
      typeColor.style.backgroundColor = color;
    });
  }

goBackButton.addEventListener("click", () => {
  window.history.back();
});