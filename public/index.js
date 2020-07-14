String.prototype.replaceAll = function (from, to) { return this.split(from).join(to); }

const applyTemplate = template => item => template
    .replaceAll('{{NUMBER}}', item.number.toString().padStart(3, '0'))
    .replaceAll('{{NAME}}', item.name)
    .replaceAll('{{CLASSES}}', item.types.join(' '))
    .replaceAll('{{TYPES}}', item.types.join(' | '))
    .replaceAll('{{IMAGE}}', `/images/${item.number}.png`);

const responseToJson = response => response.json();
const map = fn => arr => arr.map(fn);


(() => {

    const pokemonCardTemplate = document.querySelector('template#pokeCard').innerHTML;
    const applyPokemonCardTemplate = applyTemplate(pokemonCardTemplate);
    const listElement = document.querySelector('ul.pokedex');

    fetch('/api/pokemons')
        .then(responseToJson)
        .then(map(applyPokemonCardTemplate))
        .then(cards => listElement.innerHTML = cards.join('\n'))

})();