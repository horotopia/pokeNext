"use client";
import { useState, useEffect } from "react";
import { usePokemonContext } from "../contexts/PokemonContext";
import { useRouter } from "next/navigation";
import { getPokemonsByType, getTypes, getPokemons } from "@/api/pokemons";

export default function HomeHeader() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [types, setTypes] = useState([]);
  const { pokemons, setPokemons } = usePokemonContext();

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("types")) {
        const typesFromStorage = JSON.parse(localStorage.getItem("types"));
        setTypes(typesFromStorage);
      } else {
        const types = await getTypes();
        localStorage.setItem("types", JSON.stringify(types));
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    if (!type) return;
    console.log(type);
    const fetchByType = async () => {
      if (type === "0") {
        const pokemons = await getPokemons(1,50);
        setPokemons(pokemons);
        return;
      }
      const pokemonByType = await getPokemonsByType(type);
      if (!pokemonByType || pokemonByType.length === 0) {
        setPokemons([]);
        return;
      }
      setPokemons(pokemonByType);
    };
    fetchByType();
  }, [type]);

  useEffect(() => {
    if (!search) return;
    const fetchByName = async () => {
      // if (search.length === 0) {
      //   setPokemons(pokemons);
      //   return;
      // }
      const pokemonByName = await getPokemonsByName(search);
      if (!pokemonByName || pokemonByName.length === 0) {
        setPokemons([]);
        return;
      }
      setPokemons(pokemonByName);
    };
    fetchByName();
  }, [search]);

  useEffect(() => {
    setPokemons(search.length ? search : pokemons);
  }, [search]);

  return (
    <>
      <header className="bg-white shadow p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="Rechercher par nom"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="0">Tous les types</option>
          {types && types.map((t) => (
            <option key={t.name} value={t.id}>{t.name}</option>
          ))}
        </select>
      </header>
    </>
  );
}