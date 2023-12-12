import { useState, useEffect } from "react";
import axios from "axios";

export default function API(props) {
  // console.log(props);

  // variable --- updaterFunc --- initial Value
  const [pokemon, setPokemon] = useState([]);
  const [name, setName] = useState("");

  // store data

  // use effect is for getting, generating or executing code
  useEffect(() => {
    const getPokemon = async () => {
      let data = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${props.pokemon}`
      );
      // console.log(data);
      let newPokemon = [...pokemon];
      newPokemon.push(data.data);
      setPokemon(newPokemon);
    };

    getPokemon();
  }, []);

  useEffect(() => {
    // console.log(pokemon);
  }, [pokemon]);

  const getThatPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then((data) => {
      // console.log(data);
      let newPokemon = [...pokemon];
      newPokemon.push(data.data);
      setPokemon(newPokemon);
    });
    // console.log("Hi");
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        placeholder="Pokemon name"
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <button onClick={getThatPokemon}>Get a pokemon</button>
      {pokemon && pokemon.length > 0 ? (
        pokemon.map((pokemon, index) => (
          <div key={index}>
            <p>{pokemon.name}</p>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          </div>
        ))
      ) : (
        <p>No pokemon yet</p>
      )}
    </div>
  );
}
