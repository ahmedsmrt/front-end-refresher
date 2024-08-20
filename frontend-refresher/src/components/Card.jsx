import React from 'react';

const Card = ({ pokemon }) => {
  if (!pokemon) {
    return <article className="w-[300px] h-[400px] border-2 border-solid border-white text-red-600 text-center">Loading...</article>;
  }

  return (
    <article className="w-[300px] h-[400px] border-2 border-solid border-white text-blue-300 text-center rounded-md">
      <h2 className="text-2xl capitalize mb-4">{pokemon.name}</h2>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-[150px] h-[150px] mx-auto"
      />
      <p className="mt-4">Height: {pokemon.height}</p>
      <p className="mt-2">Weight: {pokemon.weight}</p>
      {/* Rendering abilities */}
      <div className="mt-4">
        <h3 className="text-lg">Abilities:</h3>
        <ul>
          {pokemon.abilities.slice(0, 4).map((abilityObj, index) => (
            <li key={index}>{abilityObj.ability.name}</li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default Card;
