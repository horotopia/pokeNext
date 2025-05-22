const API_URL = 'https://nestjs-pokedex-api.vercel.app/';

export const getPokemons = async (page, limit) => {
  console.log("Fetching pokemons...");
  const response = await fetch(`${API_URL}pokemons?page=${page}&limit=${limit}`);
  const data = await response.json();
  return data;
};

export const getPokemonById = async (id) => {
  console.log("Fetching pokemon by ID...");
  const response = await fetch(`${API_URL}pokemons/${id}`);
  const data = await response.json();
  return data;
};

export const getPokemonsByType = async (typeId) => {
  console.log("Fetching pokemons by type...");
  const response = await fetch(`${API_URL}pokemons?types=${typeId}`);
  const data = await response.json();
  return data;
};

export const getPokemonByName = async (name) => {
  console.log("Fetching pokemon by name...");
  const response = await fetch(`${API_URL}pokemons?name=${name}`);
  const data = await response.json();
  return data;
};

export const getTypes = async () => {
  console.log("Fetching types...");
  const response = await fetch(`${API_URL}types`);
  const data = await response.json();
  return data;
}