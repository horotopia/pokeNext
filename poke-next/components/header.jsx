"use client";
import { useState, useEffect } from "react";
import { usePokemonContext } from "../contexts/PokemonContext";
import { useRouter } from "next/navigation";
import PokemonCard from "./PokemonCard";

export default function HomeHeader() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [types, setTypes] = useState([]);
  const { pokemons, setPokemons } = usePokemonContext();
  const [filtered, setFiltered] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await fetch("https://nestjs-pokedex-api.vercel.app/types");
        const data = await res.json();
        setTypes(Array.isArray(data) ? data : data.results);
      } catch (e) {
        setTypes([]);
      }
    };
    fetchTypes();
  }, []);

  useEffect(() => {
    if (!type) return;
    const fetchByType = async () => {
      try {
        const res = await fetch(`https://nestjs-pokedex-api.vercel.app/pokemons?types=${encodeURIComponent(type)}`);
        const data = await res.json();
        const pokemonsArray = Array.isArray(data) ? data : data.results;
        setFiltered(pokemonsArray || []);
      } catch (e) {
        setFiltered([]);
      }
    };
    fetchByType();
  }, [type]);

  useEffect(() => {
    let result = pokemons;
    if (search) {
      result = result.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    setFiltered(result);
  }, [search, pokemons]);

  useEffect(() => {
    if (!search) return;
    const fetchByName = async () => {
      try {
        const res = await fetch(`https://nestjs-pokedex-api.vercel.app/pokemons?name=${encodeURIComponent(search)}`);
        const data = await res.json();
        const pokemonsArray = Array.isArray(data) ? data : data.results;
        setFiltered(pokemonsArray || []);
      } catch (e) {
        setFiltered([]);
      }
    };
    fetchByName();
  }, [search]);

  useEffect(() => {
    setPokemons(filtered.length ? filtered : pokemons);
  }, [filtered]);

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
          <option value="">Tous les types</option>
          {types && types.map((t) => (
            <option key={t.name} value={t.name}>{t.name}</option>
          ))}
        </select>
      </header>
      <ul className="flex flex-row flex-wrap gap-4 justify-center">
        {filtered.map((pokemon) => (
          <li
            key={pokemon.id}
            className="cursor-pointer"
            onClick={() => router.push(`/pokemon/${pokemon.id}`)}
          >
            <PokemonCard pokemon={pokemon} />
          </li>
        ))}
      </ul>
    </>
  );
}