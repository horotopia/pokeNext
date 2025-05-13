"use client";
import React from "react";

export default function PokemonCard({ pokemon }) {
  if (!pokemon) return null;
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center w-64 border hover:scale-105 transition-transform">
      <span className="font-bold text-lg mb-2 capitalize">{pokemon.name}</span>
      {pokemon.image && (
        <img src={pokemon.image} alt={pokemon.name} className="w-24 h-24 object-contain mb-2" />
      )}
      {pokemon.stats && (
        <ul className="w-full text-xs text-gray-600 mt-2">
          {Object.entries(pokemon.stats).map(([stat, value]) => (
            <li key={stat} className="flex justify-between">
              <span className="capitalize">{stat}</span>
              <span className="font-semibold">{value}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
