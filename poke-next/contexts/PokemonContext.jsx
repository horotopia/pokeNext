"use client";

import { createContext, useContext } from "react";

const defaultValue = {
  pokemons: [],
  setPokemons: () => {},
  loading: false,
};

export const PokemonContext = createContext(defaultValue);

export function usePokemonContext() {
  return useContext(PokemonContext);
}