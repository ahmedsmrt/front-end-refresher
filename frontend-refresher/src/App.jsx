import { useEffect, useState } from 'react';
import Card from './components/Card';
import './App.css';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [maxPokemon, setMaxPokemon] = useState(3);

  const incrementPokemonHandler = () => {
    setMaxPokemon(maxPokemon + 1);
  };

  const decrementPokemonHandler = () => {
    setMaxPokemon(prevMaxPokemon => Math.max(1, prevMaxPokemon - 1));
  };

  const defaultPokemonHandler = () => {
    setMaxPokemon(6);
  };

  // Function to fetch Pokémon data
  const fetchPokemon = async (identifier) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${identifier}/`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error catching them all: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to catch them all:", error);
      return null;
    }
  };

  // useEffect to fetch data for each Pokémon on component mount
  useEffect(() => {
    const fetchAllPokemon = async () => {
      const promises = Array.from({ length: maxPokemon }).map((_, index) =>
        fetchPokemon(index + 1) // Fetch Pokémon data by ID (1, 2, 3, ...)
      );
      const results = await Promise.all(promises);
      setPokemonData(results);
    };

    fetchAllPokemon();
  }, [maxPokemon]);

  return (
    <>
      <main className="w-screen flex flex-col justify-center align-center items-center">
        <section className="w-[1200px] flex flex-wrap gap-2 justify-center items-center">
          {pokemonData.map((pokemon, index) => (
            <Card key={index} pokemon={pokemon} />
          ))}
        </section>
        <section className="btn-container mt-10 flex gap-1">
          <button
            className="px-4 py-2 min-w-[12rem] bg-green-500 text-white rounded"
            onClick={incrementPokemonHandler}
          >
            Add Pokemon
          </button>
          <button
            className="px-4 py-2 min-w-[12rem] bg-red-500 text-white rounded"
            onClick={decrementPokemonHandler}
          >
            Remove Pokemon
          </button>
          <button
            className="px-4 py-2 min-w-[12rem] bg-blue-400 text-white rounded"
            onClick={defaultPokemonHandler}
          >
            Set Default
          </button>
        </section>
      </main>
    </>
  );
}

export default App;
