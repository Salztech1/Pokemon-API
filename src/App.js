import './App.css';
import { useState } from 'react';
import Axios from 'axios';

function App() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonSelected, setPokemonSelected] = useState(false);
  const [pokemonInfo, setPokemonInfo] = useState({
    name: "",
    species: "",
    url: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    type: ""
  })

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response) => {
      setPokemonInfo({
        name: pokemonName,
        species: response.data.species.name,
        url: response.data.species.url,
        image: response.data.sprites.back_default,
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        type: response.data.types[0].type.name
      });
      setPokemonSelected(true)
    })
  }

  return (
    <div className="App">
      <div className='Heading'>
        <h2>Pokemon API</h2>
        <input type='text' onChange={(event) => { setPokemonName(event.target.value) }} />
        <button onClick={searchPokemon}>Serach Pokemon</button>
      </div>
      <div className='Selected'>
        {!pokemonSelected ? (<h2>Choose a pokemon</h2>) : (
          <>
            <h1>{pokemonInfo.name}</h1>
            <img src={pokemonInfo.image} alt=''/>
            <h3>Species:{pokemonInfo.species}</h3>
            <p><b>url:</b> {pokemonInfo.url}</p>
            <h4>HP:{pokemonInfo.hp}</h4>
            <h3>Type:{pokemonInfo.type}</h3>
            <h4>Attack:{pokemonInfo.attack}</h4>
            <h4>Defense:{pokemonInfo.defense}</h4>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
