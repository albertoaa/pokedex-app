export type Pokemon = {
  name: string;
  url: string;
  sprites: {
    front_default: string;
  };
  types: PokemonType[];
  abilities: PokemonAbility[];
  moves: PokemonMove[];
};

export type CaughtPokemon = {
  name: string;
  picture: string;
  type: PokemonType[];
  abilities: PokemonAbility[];
};

export type PokemonAbility = {
  ability: {
    name: string;
  };
};

export type PokemonType = {
  type: {
    name: string;
  };
};

export type PokemonMove = {
  move: {
    name: string;
  };
};
