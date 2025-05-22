"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import PokemonCard from "@/components/PokemonCard";
import HomeHeader from "@/components/header";

export default function PokemonPage({ params }) {
  // Unwrap the params Promise using React.use()
  const unwrappedParams = use(params);
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch(`https://nestjs-pokedex-api.vercel.app/pokemons/${unwrappedParams.id}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setPokemon(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }    };
    fetchPokemon();
  }, [unwrappedParams.id]);

  if (loading) return <div>Loading...</div>;
  if (!pokemon) return <div>Pokemon not found</div>;

  return (
    <div className="flex flex-col items-center">
      <HomeHeader />
      <PokemonCard pokemon={pokemon}/>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200"
        onClick={() => router.push("/")}
      >
        Back to Home
      </button>
    </div>
  );
}