"use client";
import React, { useEffect, useState, useRef, useContext } from "react";
import { PokemonContext } from "../contexts/PokemonContext";

export default function PokemonList() {
  const { pokemons, setPokemons } = useContext(PokemonContext);
  const [loading, setLoading] = useState(true);
  const limit = 50;
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const isFetching = useRef(false);

  const fetchPokemons = async (page) => {
    try {
      isFetching.current = true;
      setLoading(true);
      const res = await fetch(`https://nestjs-pokedex-api.vercel.app/pokemons?page=${page}&limit=${limit}`);
      const data = await res.json();
      const pokemonsArray = Array.isArray(data) ? data : data.results;
      if (!pokemonsArray || pokemonsArray.length < limit) setHasMore(false);
      setPokemons((prev) => [
        ...prev,
        ...pokemonsArray.filter(p => !prev.some(existing => existing.id === p.id)),
      ]);
    } catch (e) {
      setHasMore(false);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  };

  useEffect(() => {
    fetchPokemons(page);
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    if (!hasMore) return;
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        hasMore &&
        !isFetching.current
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  return (
    <>
      <ul className="flex flex-row flex-wrap gap-4 justify-center">
        {pokemons.map((pokemon) => (
          <li key={pokemon.id} className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center w-64 border hover:scale-105 transition-transform">
            <span className="font-bold text-lg mb-2 capitalize">{pokemon.name}</span>
            {pokemon.image && (
              <img src={pokemon.image} alt={pokemon.name} className="w-24 h-24 object-contain mb-2" />
            )}
            {pokemon.types && (
              <div className="flex gap-2">
                {pokemon.types.map((type) => (
                  <span key={type.name} className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold">
                    {type.name}
                  </span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
      {loading && <div className="text-center my-4">Chargement...</div>}
      {!hasMore && <div className="text-center my-4">Fin de la liste</div>}
    </>
  );
}