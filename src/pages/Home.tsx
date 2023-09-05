import { useState, useEffect } from 'react';
import * as types from '../types/pokemonTypes';

import { PokemonItem } from '../components/PokemonItem';

export const Home = () => {
  const [allPokemons, setAllPokemons] = useState<types.Pokemon[]>([]);

  const fetchAllPokemons = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=18');
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
      <section className="search-bar flex w-2/5 p-4">
        <input
          type="text"
          id="first_name"
          className="block w-full rounded-lg border border-gray-300 bg-blue-200 p-2.5 text-sm text-black placeholder-gray-700 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Search your favorite Pokemon by Name"
          required
        />
        <button className="mx-4 bg-sky-800 px-4 py-2 text-white">Search</button>
      </section>
      <section className="grid grid-cols-6 items-center justify-center gap-2">
        {allPokemons.map((pokemon, index) => (
          <PokemonItem key={index} pokemon={pokemon} />
        ))}
      </section>
    </div>
  );
};
