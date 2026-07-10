import 'dotenv/config';

const BASE_URL = 'https://api.rawg.io/api';
const API_KEY = process.env.RAWG_API_KEY;

export async function getGames(search = '', page = 1) {
  const url = new URL(`${BASE_URL}/games`);
  url.searchParams.set('key', API_KEY);
  url.searchParams.set('page', page);
  if (search) url.searchParams.set('search', search);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`RAWG API error: ${response.status}`);
  }
  return response.json();
}

export async function getGameById(id) {
  const url = new URL(`${BASE_URL}/games/${id}`);
  url.searchParams.set('key', API_KEY);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`RAWG API error: ${response.status}`);
  }
  return response.json();
}