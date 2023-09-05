import { useState, useEffect } from 'react';
import * as types from '../types/pokemonTypes';

import { PokemonItem } from '../components/PokemonItem';

export const Home = () => {
  const [allPokemons, setAllPokemons] = useState<types.Pokemon[]>([]);

  const fetchAllPokemons = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
    const data = await response.json();
    setAllPokemons(data.results);
  };

  useEffect(() => {
    fetchAllPokemons();
  }, []);

  return (
    <div>
      <header className="bg-blue-300 p-4">
        <h1 className="text-3xl text-white">Pokedex APP</h1>
      </header>
      <section className="grid grid-cols-6 items-center justify-center gap-2">
        {allPokemons.map((pokemon, index) => (
          <PokemonItem key={index} pokemon={pokemon} />
        ))}
      </section>
    </div>
  );
};
