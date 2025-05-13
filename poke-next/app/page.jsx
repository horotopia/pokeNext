"use client";

import { useState } from "react";
import { PokemonContext } from "@/contexts/PokemonContext";
import PokemonList from "../components/fetchAPI";
import HomeHeader from "../components/header";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);

  return (
    <>
      <PokemonContext.Provider value={{ pokemons, setPokemons }}>
        <HomeHeader />
        <PokemonList />
      </PokemonContext.Provider>
    </>
  );
}
