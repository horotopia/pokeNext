"use client";

import { useState } from "react";
import { PokemonContext } from "@/contexts/PokemonContext";
import { FetchParamsProvider } from "@/contexts/FetchParamsContext";
import PokemonList from "../components/list";
import HomeHeader from "../components/header";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);

  return (
    <>
      <PokemonContext.Provider value={{ pokemons, setPokemons }}>
        <FetchParamsProvider>
          <HomeHeader />
          <PokemonList />
        </FetchParamsProvider>
      </PokemonContext.Provider>
    </>
  );
}
