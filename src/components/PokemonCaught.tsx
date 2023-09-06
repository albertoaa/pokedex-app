import React, { useState } from 'react';
import * as types from '../types';

interface PokemonCaughtProps {
  pokemon: types.CaughtPokemon;
}

export const PokemonCaught: React.FC<PokemonCaughtProps> = ({ pokemon }) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-70 m-4 h-80 rounded-md border-2 border-black bg-slate-300">
      <div className="info h-3/4 flex-col items-center justify-center justify-self-center">
        {!isFlipped ? (
          <div className="card-face">
            <img
              src={pokemon.picture}
              alt={pokemon.name}
              className="m-auto w-4/5"
            />
            <p className="text-center">{pokemon.name}</p>
          </div>
        ) : (
          <div className="card-face back-face">
            <h3 className="text-center text-xl font-bold">{pokemon.name}</h3>
            <div className="ml-2 w-4/5">
              <h4 className="text-md text-start font-semibold underline">
                Abilities
              </h4>
              <p className="ml-2 list-none">
                {pokemon.abilities.map(
                  (ability: types.PokemonAbility, index) => (
                    <span key={index} className="pr-2">
                      {ability.ability.name}
                    </span>
                  ),
                )}
              </p>
            </div>
            <div className="ml-2 w-4/5">
              <h4 className="text-md text-start font-semibold underline">
                Type
              </h4>
              <p className="ml-2 list-none">
                {pokemon.type.map((type: types.PokemonType, index) => (
                  <span className="pr-2" key={index}>
                    {type.type.name}
                  </span>
                ))}
              </p>
            </div>
          </div>
        )}
      </div>
      <div
        className={`flex h-1/4 items-center justify-evenly ${
          isFlipped ? 'flipped' : ''
        }`}
      >
        <button
          className="mx-1 w-16 bg-blue-300 px-2 py-2 text-gray-800"
          onClick={handleFlip}
        >
          {isFlipped ? 'Back' : 'Info'}
        </button>
      </div>
    </div>
  );
};
