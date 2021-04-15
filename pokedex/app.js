const searchForm = document.getElementById('search-form');
const search = document.getElementById('search');
const suggestionList = document.querySelector('.suggestionList');
const pokemon = document.querySelector('.pokemon');
const image = document.querySelector('.pokemon-image');
const pokemonName = document.querySelector('.pokemon-name');
const number = document.querySelector('.pokemon-number');
const type = document.querySelector('.pokemon-type');
const ability = document.querySelector('.pokemon-abilities');
const shiny = document.querySelector('.shiny');
const base = document.querySelector('.base');
const entry = document.querySelector('.entry');
const stats = document.querySelector('.stats');
const Hp = document.getElementById('Hp');
const Attack = document.getElementById('Attack');
const Defence = document.getElementById('Defence');
const SpecialAttack = document.getElementById('Special Attack');
const SpecialDefence = document.getElementById('Special Defence');
const Speed = document.getElementById('Speed');
const BST = document.getElementById('BST');
const lineH = document.querySelector('.lineH');
const lineA = document.querySelector('.lineA');
const lineD = document.querySelector('.lineD');
const lineSPA = document.querySelector('.lineSPA');
const lineSPD = document.querySelector('.lineSPD');
const lineS = document.querySelector('.lineS');

const displayPokemon = (pokemonData) => {
pokemon.style.display = 'flex';    
stats.style.display = 'grid';    
image.src = pokemonData.sprites.front_default;
const name = pokemonData.name[0].toUpperCase() + pokemonData.name.substring(1);
pokemonName.textContent = `Name: ${name}`;
number.textContent = `#${pokemonData.id.toString().padStart(4, '0')}`;

if(pokemonData.types.length > 1){
    type.textContent = `Type: ${pokemonData.types[0].type.name}/${pokemonData.types[1].type.name}`; 
}else{
    type.textContent = `Type: ${pokemonData.types[0].type.name}`;
}

if(pokemonData.abilities.length === 1){    
        fetch(`https://pokeapi.co/api/v2/ability/${pokemonData.abilities[0].ability.name}`)
        .then(res => res.json())
        .then(data => {
            if(data.effect_entries[0].language.name === 'en'){
            const abbr = data.effect_entries[0].short_effect;
            ability.innerHTML = `Ability: <abbr title = "${abbr}"> ${pokemonData.abilities[0].ability.name} </abbr>`;
            }else if(data.effect_entries[1].language.name === 'en'){
            const abbr = data.effect_entries[1].short_effect;
            ability.innerHTML = `Ability: <abbr title = "${abbr}"> ${pokemonData.abilities[0].ability.name} </abbr>`;
            }    
        }).catch(err => console.log(err));

    }else if(pokemonData.abilities.length === 2){
    fetch(`https://pokeapi.co/api/v2/ability/${pokemonData.abilities[0].ability.name}`)
    .then(res => res.json())
    .then(data => displayAbilityAbbr(data))
    .catch(err => console.log(err));

    const displayAbilityAbbr = (ability1) => {
    fetch(`https://pokeapi.co/api/v2/ability/${pokemonData.abilities[1].ability.name}`)
    .then(res => res.json())
    .then(data => {
    const abilityLang = (abbr1, abbr2) => {
    ability.innerHTML = `Abilities: <abbr title = "${abbr1}"> ${pokemonData.abilities[0].ability.name} </abbr> and <abbr title="${abbr2}"> ${pokemonData.abilities[1].ability.name} </abbr>`;    
    }

    const abbr1 = ability1.effect_entries[0].short_effect;
    const abbr2 = ability1.effect_entries[1].short_effect;        
    const abbr3 = data.effect_entries[0].short_effect;
    const abbr4 = data.effect_entries[1].short_effect;

    if(data.effect_entries[0].language.name === 'en' && ability1.effect_entries[0].language.name === 'en'){
        abilityLang(abbr1, abbr3);
    }else if(data.effect_entries[0].language.name === 'en' && ability1.effect_entries[1].language.name === 'en'){
        abilityLang(abbr2, abbr3);
    }else if(data.effect_entries[1].language.name === 'en' && ability1.effect_entries[0].language.name === 'en'){
        abilityLang(abbr1, abbr4);
    }else if(data.effect_entries[1].language.name === 'en' && ability1.effect_entries[1].language.name === 'en'){
        abilityLang(abbr2, abbr4);
    }
    })
    .catch(err => console.log(err));
}
    
    }else if(pokemonData.abilities.length === 3){
    fetch(`https://pokeapi.co/api/v2/ability/${pokemonData.abilities[0].ability.name}`)
    .then(res => res.json())
    .then(data => ability2(data))
    .catch(err => console.log(err));
    
    const ability2 = (ability1) => {
    fetch(`https://pokeapi.co/api/v2/ability/${pokemonData.abilities[1].ability.name}`)
    .then(res => res.json())
    .then(data => displayAbilityAbbr(ability1, data)
)
.catch(err => console.log(err));
}

    const displayAbilityAbbr = (ability1, ability2) => {
        fetch(`https://pokeapi.co/api/v2/ability/${pokemonData.abilities[2].ability.name}`)
        .then(res => res.json())
        .then(data => {
        
        const enAbility1 = ability1.effect_entries.filter(entry => {
            return entry.language.name === 'en';
        });

        const enAbility2 = ability2.effect_entries.filter(entry => {
            return entry.language.name === 'en';
        });

        const enAbility3 = data.effect_entries.filter(entry => {
            return entry.language.name === 'en';
        });

        console.log(enAbility3);

        ability.innerHTML = `Abilities: <abbr title = "${enAbility1[0].short_effect}"> ${pokemonData.abilities[0].ability.name} </abbr> ,<abbr title="${enAbility2[0].short_effect}"> ${pokemonData.abilities[1].ability.name} </abbr> and <abbr title = "${enAbility3[0].short_effect}"> ${pokemonData.abilities[2].ability.name} </abbr> `;     
        });
    }    
}
    
    shiny.addEventListener('click', (e) => {
        e.preventDefault();
        image.src = pokemonData.sprites.front_shiny;
        base.style.display = 'block';
        shiny.style.display = 'none';
    });

    base.addEventListener('click', (e) => {
        e.preventDefault();
        image.src = pokemonData.sprites.front_default;
        shiny.style.display = 'block';
        base.style.display = 'none';        
    });
    
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonData.name}/`)
.then(res => res.json())
.then(data => {
    entry.style.display = 'block';
    const pokedex_entry = data.flavor_text_entries.find(flavor_text => flavor_text.language.name === 'en');
    entry.innerHTML = `${pokemonData.name}'s pokedex entry says: ${pokedex_entry.flavor_text}`;
})
.catch(err => console.log(err));

const HpStat = pokemonData.stats[0].base_stat;
const AttackStat = pokemonData.stats[1].base_stat;
const DefenceStat = pokemonData.stats[2].base_stat;
const SpAStat = pokemonData.stats[3].base_stat;
const SpDStat = pokemonData.stats[4].base_stat;
const SpeedStat = pokemonData.stats[5].base_stat;
const total =  HpStat+AttackStat+DefenceStat+SpAStat+SpDStat+SpeedStat;

Hp.innerHTML = `Hp: ${HpStat} <div class="lineH"> </div>`;
Attack.innerHTML = `Attack: ${AttackStat} <div class="lineH"> </div>`;
Defence.innerHTML = `Defence: ${DefenceStat} <div class="lineH"> </div>`;
SpecialAttack.innerHTML = `Special Attack: ${SpAStat} <div class="lineH"> </div>`;
SpecialDefence.innerHTML = `Special Defence: ${SpDStat} <div class="lineH"> </div>`;
Speed.innerHTML = `Speed: ${SpeedStat} <div class="lineH"> </div>`;
BST.innerHTML = `Base Stat Total: ${total}`;

if(HpStat < 50){
lineH.style.width = '200px';
lineH.style.height = '20px';
lineH.style.backgroundColor = 'red';
}else if(HpStat >= 50 && HpStat < 70){
    lineH.style.width = '250px';
    lineH.style.height = '20px';
    lineH.style.backgroundColor = 'orange';
}else if(HpStat >= 70 && HpStat < 100){
    lineH.style.width = '300px';
    lineH.style.height = '20px';
    lineH.style.backgroundColor = 'yellow';
}else if(HpStat >= 100 && HpStat < 150){
    lineH.style.width = '325px';
    lineH.style.height = '20px';
    lineH.style.backgroundColor = 'rgb(95, 216, 47)';
}else if(HpStat >= 150 && HpStat < 200){
    lineH.style.width = '350px';
    lineH.style.height = '20px';
    lineH.style.backgroundColor = 'rgb(138, 255, 92)';
}else if(HpStat >= 200){
    lineH.style.width = '370px';
    lineH.style.height = '20px';
    lineH.style.backgroundColor = 'rgb(0, 255, 234)';
}

if(AttackStat < 50){
    lineA.style.width = '200px';
    lineA.style.height = '20px';
    lineA.style.backgroundColor = 'red';
}else if(AttackStat >= 50 && AttackStat < 70){
    lineA.style.width = '250px';
    lineA.style.height = '20px';
    lineA.style.backgroundColor = 'orange';
}else if(AttackStat >= 70 && AttackStat < 100){
    lineA.style.width = '300px';
    lineA.style.height = '20px';
    lineA.style.backgroundColor = 'yellow';
}else if(AttackStat >= 100 && AttackStat < 150){
    lineA.style.width = '325px';
    lineA.style.height = '20px';
    lineA.style.backgroundColor = 'rgb(95, 216, 47)';
}else if(AttackStat >= 150 && AttackStat < 200){
    lineA.style.width = '350px';
    lineA.style.height = '20px';
    lineA.style.backgroundColor = 'rgb(138, 255, 92)';
}else if(AttackStat >= 200){
    lineA.style.width = '370px';
    lineA.style.height = '20px';
    lineA.style.backgroundColor = 'rgb(0, 255, 234)';
}

 
if(DefenceStat < 50){
    lineD.style.width = '200px';
    lineD.style.height = '20px';
    lineD.style.backgroundColor = 'red';
    }else if(DefenceStat >= 50 && DefenceStat < 70){
        lineD.style.width = '250px';
        lineD.style.height = '20px';
        lineD.style.backgroundColor = 'orange';
    }else if(DefenceStat >= 70 && DefenceStat < 100){
        lineD.style.width = '300px';
        lineD.style.height = '20px';
        lineD.style.backgroundColor = 'yellow';
    }else if(DefenceStat >= 100 && DefenceStat < 150){
        lineD.style.width = '325px';
        lineD.style.height = '20px';
        lineD.style.backgroundColor = 'rgb(95, 216, 47)';
    }else if(DefenceStat >= 150 && DefenceStat < 200){
        lineD.style.width = '350px';
        lineD.style.height = '20px';
        lineD.style.backgroundColor = 'rgb(138, 255, 92)';
    }else if(DefenceStat >= 200){
        lineD.style.width = '370px';
        lineD.style.height = '20px';
        lineD.style.backgroundColor = 'rgb(0, 255, 234)';
    }
    
 
if(SpAStat < 50){
    lineSPA.style.width = '200px';
    lineSPA.style.height = '20px';
    lineSPA.style.backgroundColor = 'red';
    }else if(SpAStat >= 50 && SpAStat < 70){
        lineSPA.style.width = '250px';
        lineSPA.style.height = '20px';
        lineSPA.style.backgroundColor = 'orange';
    }else if(SpAStat >= 70 && SpAStat < 100){
        lineSPA.style.width = '300px';
        lineSPA.style.height = '20px';
        lineSPA.style.backgroundColor = 'yellow';
    }else if(SpAStat >= 100 && SpAStat < 150){
        lineSPA.style.width = '325px';
        lineSPA.style.height = '20px';
        lineSPA.style.backgroundColor = 'rgb(95, 216, 47)';
    }else if(SpAStat >= 150 && SpAStat < 200){
        lineSPA.style.width = '350px';
        lineSPA.style.height = '20px';
        lineSPA.style.backgroundColor = 'rgb(138, 255, 92)';
    }else if(SpAStat >= 200){
        lineSPA.style.width = '370px';
        lineSPA.style.height = '20px';
        lineSPA.style.backgroundColor = 'rgb(0, 255, 234)';
    }    
    
if(SpDStat < 50){
    lineSPD.style.width = '200px';
    lineSPD.style.height = '20px';
    lineSPD.style.backgroundColor = 'red';
    }else if(SpDStat >= 50 && SpDStat < 70){
        lineSPD.style.width = '250px';
        lineSPD.style.height = '20px';
        lineSPD.style.backgroundColor = 'orange';
    }else if(SpDStat >= 70 && SpDStat < 100){
        lineSPD.style.width = '300px';
        lineSPD.style.height = '20px';
        lineSPD.style.backgroundColor = 'yellow';
    }else if(SpDStat >= 100 && SpDStat < 150){
        lineSPD.style.width = '325px';
        lineSPD.style.height = '20px';
        lineSPD.style.backgroundColor = 'rgb(95, 216, 47)';
    }else if(SpDStat >= 150 && SpDStat < 200){
        lineSPD.style.width = '350px';
        lineSPD.style.height = '20px';
        lineSPD.style.backgroundColor = 'rgb(138, 255, 92)';
    }else if(SpDStat >= 200){
        lineSPD.style.width = '370px';
        lineSPD.style.height = '20px';
        lineSPD.style.backgroundColor = 'rgb(0, 255, 234)';
    }    

if(SpeedStat < 50){
    lineS.style.width = '200px';
    lineS.style.height = '20px';
    lineS.style.backgroundColor = 'red';
    }else if(SpeedStat >= 50 && SpeedStat < 70){
        lineS.style.width = '250px';
        lineS.style.height = '20px';
        lineS.style.backgroundColor = 'orange';
    }else if(SpeedStat >= 70 && SpeedStat < 100){
        lineS.style.width = '300px';
        lineS.style.height = '20px';
        lineS.style.backgroundColor = 'yellow';
    }else if(SpeedStat >= 100 && SpeedStat < 150){
        lineS.style.width = '325px';
        lineS.style.height = '20px';
        lineS.style.backgroundColor = 'rgb(95, 216, 47)';
    }else if(SpeedStat >= 150 && SpeedStat < 200){
        lineS.style.width = '350px';
        lineS.style.height = '20px';
        lineS.style.backgroundColor = 'rgb(138, 255, 92)';
    }else if(SpeedStat >= 200){
        lineS.style.width = '370px';
        lineS.style.height = '20px';
        lineS.style.backgroundColor = 'rgb(0, 255, 234)';
    }    
};

const getPokemon = (searchVal) => {    
fetch(`https://pokeapi.co/api/v2/pokemon/${searchVal.toLowerCase()}`)
.then(res => res.json())
.then(data => {
    displayPokemon(data);
})
.catch(err => console.log(err));

suggetionsList.style.display = 'none';
};

const searchFilter = (pokemons) => {
let matches = pokemons.filter(pokemon => {
    const regExp = new RegExp(`^${search.value}`, 'gi');
    return pokemon.name.match(regExp);
});

if(search.value.length === 0){
    matches = [];
    suggestionList.innerHTML = '';
}

outputSuggetions(matches)
};

const outputSuggetions = (matches) => {
  if(search.value.length !== 0){
    if(matches.length > 0){
        const suggestions = matches.map(match => 
        `<div class="suggestion">
        <h3 class="suggestion-name">${match.name}</h3>
        </div>`
        ).join('');

        suggestionList.style.display = 'block';

        suggestionList.innerHTML = suggestions;

        const suggestion = document.querySelectorAll('.suggetion');
        const suggestionName = document.querySelectorAll('.suggetion-name');
       
        suggestion.forEach((el, i) => {
            el.addEventListener('click', () => {
                search.value = suggestionName[i].textContent;
                getPokemon(search.value);
                });            
        })
    }
 }
}

const searchInit = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1118`)
    .then(res => res.json())
    .then(data => searchFilter(data
        .results))
    .catch(err => console.log(err));
};

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    getPokemon(search.value)
});

search.addEventListener('input', searchInit);
