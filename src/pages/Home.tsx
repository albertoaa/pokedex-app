import { useState, useEffect } from 'react';
import * as types from '../types/pokemonTypes';

import { PokemonItem } from '../components/PokemonItem';
import { PokemonCaught } from '../components/PokemonCaught';

export const Home = () => {
  const [allPokemons, setAllPokemons] = useState<types.Pokemon[]>([]);
  const [foundPokemons, setFoundPokemons] = useState<types.Pokemon[]>([]);
  const [previous, setPrevious] = useState<string>('');
  const [next, setNext] = useState<string>('');
  const [pokemonName, setPokemonName] = useState<string>('');
  const [caughtPokemons, setCaughtPokemons] = useState<types.CaughtPokemon[]>(
    [],
  );
  const [showCaughtPokemons, setShowCaughtPokemons] = useState<boolean>(false);

  const fetchAllPokemons = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    setNext(data.next);
    setPrevious(data.previous);
    setAllPokemons(data.results);
  };

  const getCaughtPokemons = () => {
    const caughtPokemons = localStorage.getItem('caughtPokemons');
    if (caughtPokemons) {
      setCaughtPokemons(JSON.parse(caughtPokemons));
    }
  };

  useEffect(() => {
    fetchAllPokemons('https://pokeapi.co/api/v2/pokemon?limit=18');
    getCaughtPokemons();
  }, []);

  const searchPokemon = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
      );
      const data = await response.json();
      setFoundPokemons([data]);
    } catch (error) {
      alert('Pokemon not found');
    }
  };

  const handlePokemonNameChange = (pokemonName: string) => {
    if (pokemonName === '') {
      setFoundPokemons([]);
    } else {
      setPokemonName(pokemonName);
    }
  };

  const handleCatchPokemon = (pokemon: types.CaughtPokemon) => {
    const allCaughtPokemons = [...caughtPokemons, pokemon];
    setCaughtPokemons(allCaughtPokemons);
    localStorage.setItem('caughtPokemons', JSON.stringify(allCaughtPokemons));
  };

  return (
    <div>
      <header className="flex items-center justify-between bg-blue-300 p-4">
        <h1 className="text-3xl font-bold text-white">Pokedex APP</h1>
        <h2 className="text-2xl text-white">
          {showCaughtPokemons ? 'My Pokemons' : 'All Pokemons'}
        </h2>
        <aside>
          <h2 className="text-xl text-white">{`Caught Pokemons: ${caughtPokemons.length}`}</h2>
          <button
            className={`${
              caughtPokemons.length === 0 ? 'bg-slate-500' : 'bg-sky-800'
            } px-4 py-2 text-white`}
            onClick={() => setShowCaughtPokemons(!showCaughtPokemons)}
            disabled={caughtPokemons.length === 0}
          >
            {showCaughtPokemons ? 'See all Pokemons' : 'See caught Pokemons'}
          </button>
        </aside>
      </header>
      {showCaughtPokemons ? (
        <section className="grid grid-cols-6 items-center justify-center gap-2">
          {caughtPokemons.map((pokemon, index) => (
            <PokemonCaught key={index} pokemon={pokemon} />
          ))}
        </section>
      ) : (
        <>
          <section className="search-bar flex w-2/5 p-4">
            <input
              type="text"
              id="first_name"
              className="block w-full rounded-lg border border-gray-300 bg-blue-200 p-2.5 text-sm text-black placeholder-gray-700 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Search your favorite Pokemon by Name"
              required
              onChange={(e) => handlePokemonNameChange(e.target.value)}
            />
            <button
              className="mx-4 bg-sky-800 px-4 py-2 text-white"
              onClick={() => searchPokemon()}
            >
              Search
            </button>
          </section>
          <section className="grid grid-cols-6 items-center justify-center gap-2">
            {foundPokemons.length !== 0
              ? foundPokemons.map((pokemon, index) => (
                  <PokemonItem
                    key={index}
                    pokemon={pokemon}
                    handleCatchPokemon={handleCatchPokemon}
                  />
                ))
              : allPokemons.map((pokemon, index) => (
                  <PokemonItem
                    key={index}
                    pokemon={pokemon}
                    handleCatchPokemon={handleCatchPokemon}
                  />
                ))}
          </section>
          {foundPokemons.length === 0 && (
            <section className="pagination m-auto flex w-1/4 justify-evenly">
              <button
                className="mx-4 w-20 bg-sky-800 py-2 text-white"
                onClick={() => fetchAllPokemons(previous)}
                disabled={previous === null}
              >
                Previous
              </button>
              <button
                className="mx-4 w-20 bg-sky-800 py-2 text-white"
                onClick={() => fetchAllPokemons(next)}
                disabled={next === null}
              >
                Next
              </button>
            </section>
          )}
        </>
      )}
    </div>
  );
};
