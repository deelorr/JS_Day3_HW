const my_form = document.querySelector('form');
console.log(my_form);

my_form.addEventListener('submit', (event) => {
  event.preventDefault();
  pokename = event.target[0].value;
  console.log(pokename);
  pokemonData(pokename);
});

const pokemonData = async (pokename) => {
  try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokename}`);
      const data = await response.json();
      console.log(data);
      addPoke(data);
  } catch (error) {
      console.error(`There was an error: ${error}`);
  }
}

const card = document.querySelector('#card');
console.log(card);

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}; // looked up how to capitalize first letter of a string //

const addPoke = (data) => {
  console.log(data.sprites.front_default);
  const capitalizedPokeName = capitalize(data.name);
  const abilities = data.abilities.map(ability => capitalize(ability.ability.name)).join(', ');

  card.innerHTML = `
    <div class="card">
      <div class="card-top">
        <p class="name">${capitalizedPokeName}</p> <p class="HP">HP: ${data.stats[0].base_stat}</p>
      </div>
      <img src="${data.sprites.front_default}" class="pokemon-image">
      <p class="abil-head">Abilities:</p>
      <div class="abilities">
        ${data.abilities.map(ability => `<li>${capitalize(ability.ability.name)}</li>`).join('')}
      </div>
    </div>
  `;
};