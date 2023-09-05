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
      className="m-4 h-40 w-40 flex-col items-center justify-center justify-self-center rounded-md border-2 border-black bg-slate-300"
    >
      <img src={pokemonPicture} alt={pokemon.name} className="m-auto w-4/5" />
      <p className="text-center">{pokemon.name}</p>
    </div>
  );
};
