"use client";
import React, { useEffect, useState, useRef, useContext } from "react";
import { PokemonContext } from "../contexts/PokemonContext";
import { getPokemons } from "../api/pokemons";

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
      const res = await getPokemons(page, limit);
      const pokemonsArray = Array.isArray(res) ? res : res.results;
      if (!pokemonsArray || pokemonsArray.length < limit) setHasMore(false);
      setPokemons((prev) => [
        ...prev,
        ...pokemonsArray.filter(p => !prev.some(existing => existing.id === p.id)),
      ]);
      // Remove the console.log(pokemons) which might trigger re-renders
    } catch (e) {
      console.error("Error fetching pokemons:", e);
      setHasMore(false);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  };
  useEffect(() => {
    // Only fetch on initial mount and when page changes
    fetchPokemons(page);
  }, [page]); // Remove the eslint-disable comment and use proper dependencies

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

  const typeColors = {
    Normal: "bg-[#A8A878] text-gray-200",
    Plante: "bg-[#A8D8B9] text-gray-700",
    Eau: "bg-[#A0C4FF] text-gray-200",
    Feu: "bg-[#F08030] text-gray-200",
    Insecte: "bg-[#A8B820] text-gray-200",
    Poison: "bg-[#A040A1] text-gray-200",
    Psy: "bg-[#F85888] text-gray-200",
    Électrik: "bg-[#F8D030] text-gray-700",
    Combat: "bg-[#C03028] text-gray-200",
    Spectre: "bg-[#705898] text-gray-200",
    Acier: "bg-[#B8B8D0] text-gray-200",
    Fée: "bg-[#F0B6D2] text-gray-600",
    Ténèbres: "bg-[#705848] text-gray-200",
    Vol: "bg-[#A890F0] text-gray-200",
    Roche: "bg-[#B8A038] text-gray-200",
    Sol: "bg-[#E0C068] text-gray-700",
    Glace: "bg-[#98D8D8] text-gray-200",
    Dragon: "bg-[#7038F8] text-gray-200",
  };

  return (
    <>
      <ul className="flex flex-row flex-wrap gap-4 justify-center">
        {pokemons.map((pokemon) => (
          <li key={pokemon.id} 
          className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center w-64 border hover:scale-105 transition-transform"
          onClick={() => window.location.href = `/pokemon/${pokemon.id}`}
          title={`Nom: ${pokemon.name}`}
          >
            <span className="font-bold text-lg mb-2 capitalize">{pokemon.name}</span>
            {pokemon.image && (
              <img src={pokemon.image} alt={pokemon.name} className="w-24 h-24 object-contain mb-2" />
            )}
            {pokemon.types && (              <div className="flex gap-2">
                {pokemon.types.map((type, index) => (
                  <div key={`${pokemon.id}-${type.name}-${index}`} className={`${typeColors[type.name]} text-gray-200 rounded-full px-3 py-1 text-sm font-semibold flex items-center gap-1`} title={`Type: ${type.name}`}>
                    <img
                      src={type.image}
                      alt={type.name}
                      className="w-4 h-4 inline-block scale-x-[-1]"
                      />
                  <span>
                    {type.name}
                  </span>
                  </div>
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