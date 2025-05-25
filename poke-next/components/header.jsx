"use client";
import { useState, useEffect } from "react";
import { usePokemonContext } from "../contexts/PokemonContext";
import { useFetchParams } from "../contexts/FetchParamsContext";
import { useRouter } from "next/navigation";
import { getPokemonsByType, getTypes, getPokemons, getPokemonsByName } from "@/api/pokemons";
import Logo from "./Logo";

export default function HomeHeader() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [types, setTypes] = useState([]);
  const { pokemons, setPokemons } = usePokemonContext();
  const { page, setPage, limit, setLimit } = useFetchParams();

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
    console.log(type);    const fetchByType = async () => {
      if (type === "0") {
        const pokemons = await getPokemons(page, limit);
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
      const pokemonsByName = await getPokemonsByName(search);
      if (!pokemonsByName || !Array.isArray(pokemonsByName) || pokemonsByName.length === 0) {
        setPokemons([]);
        return;
      }
      setPokemons(pokemonsByName);
    };
    fetchByName();
  }, [search]);
  return (
    <>
      <header className="bg-white shadow p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <Logo onClick={() => {
          setType("");
          setSearch("");
          setPage(1);
          setLimit(50);
          router.push("/");
        }} />        
        <p>{pokemons.length}</p>
        
        <input
          type="text"
          placeholder="Rechercher par nom"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="number"
          min="1"
          max="100"
          placeholder="Limite par page"
          value={limit}
          onChange={(e) => setLimit(parseInt(e.target.value))}
          className="border rounded px-3 py-2 w-32"
          title="limite"
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