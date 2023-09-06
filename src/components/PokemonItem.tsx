import React, { useEffect, useState } from 'react';
import * as types from '../types';

interface PokemonItemProps {
  pokemon: types.Pokemon;
  handleCatchPokemon: (pokemon: types.CaughtPokemon) => void;
}

export const PokemonItem: React.FC<PokemonItemProps> = ({
  pokemon,
  handleCatchPokemon,
}) => {
  const [pokemonPicture, setPokemonPicture] = useState<string>('');
  const [pokemonAbilities, setPokemonAbilities] = useState<
    types.PokemonAbility[]
  >([]);
  const [pokemonTypes, setPokemonTypes] = useState<types.PokemonType[]>([]);
  const [pokemonMoves, setPokemonMoves] = useState<types.PokemonMove[]>([]);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  useEffect(() => {
    const fetchPokemonData = async () => {
      if (!pokemon.url) {
        setPokemonPicture(pokemon.sprites.front_default);
        setPokemonAbilities(pokemon.abilities);
        setPokemonTypes(pokemon.types);
        setPokemonMoves(pokemon.moves);
      } else {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        setPokemonPicture(data.sprites.front_default);
        setPokemonAbilities(data.abilities);
        setPokemonTypes(data.types);
        setPokemonMoves(data.moves);
      }
    };

    fetchPokemonData();
  }, [pokemon]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const getRandomMoves = (
    moves: types.PokemonMove[],
    qty: number,
  ): types.PokemonMove[] => {
    const randomMoves = [];
    for (let i = 0; i < qty; i++) {
      const randomIndex = Math.floor(Math.random() * moves.length);
      randomMoves.push(moves[randomIndex]);
    }
    return randomMoves;
  };

  const caughtPokemons = () => {
    const newPokemon: types.CaughtPokemon = {
      name: pokemon.name,
      picture: pokemonPicture,
      type: pokemonTypes,
      abilities: pokemonAbilities,
    };

    handleCatchPokemon(newPokemon);
  };

  return (
    <div className="w-70 m-4 h-80 rounded-md border-2 border-black bg-slate-300">
      <div className="info h-3/4 flex-col items-center justify-center justify-self-center">
        {!isFlipped ? (
          <div className="card-face">
            <img
              src={pokemonPicture}
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
                {pokemonAbilities.map((ability, index) => (
                  <span key={index} className="pr-2">
                    {ability.ability.name}
                  </span>
                ))}
              </p>
            </div>
            <div className="ml-2 w-4/5">
              <h4 className="text-md text-start font-semibold underline">
                Type
              </h4>
              <p className="ml-2 list-none">
                {pokemonTypes.map((type, index) => (
                  <span className="pr-2" key={index}>
                    {type.type.name}
                  </span>
                ))}
              </p>
            </div>
            <div className="ml-2 w-4/5">
              <h4 className="text-md text-start font-semibold underline">
                Moves
              </h4>
              <p className="ml-2 list-none">
                {getRandomMoves(pokemonMoves, 5).map((move, index) => (
                  <span className="pr-2" key={index}>
                    {move.move.name}
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
        <button
          className="mx-1 w-16 bg-sky-800 px-2 py-2 text-white"
          onClick={caughtPokemons}
        >
          Catch
        </button>
      </div>
    </div>
  );
};
