import { useEffect, useState } from 'react';
import { Pokemon } from '../types';

interface PokemonItemProps {
  pokemon: Pokemon;
  key: number;
}

export const PokemonItem: React.FC<PokemonItemProps> = ({ key, pokemon }) => {
  const [pokemonPicture, setPokemonPicture] = useState<string>('');

  useEffect(() => {
    const fetchPokemonPicture = async () => {
      const response = await fetch(pokemon.url);
      const data = await response.json();
      setPokemonPicture(data.sprites.front_default);
    };

    fetchPokemonPicture();
  }, []);

  return (
    <div
      key={key}
      className="m-4 h-60 w-40 rounded-md border-2 border-black bg-slate-300"
    >
      <div className="info h-3/4 flex-col items-center justify-center justify-self-center">
        <img src={pokemonPicture} alt={pokemon.name} className="m-auto w-4/5" />
        <p className="text-center">{pokemon.name}</p>
      </div>
      <div className="flex h-1/4 items-center justify-evenly">
        <button className="bg-blue-300 px-4 py-2 text-gray-800">View</button>
        <button className="bg-sky-800 px-4 py-2 text-white">Catch</button>
      </div>
    </div>
  );
};
