import { normalizeTitle } from "../utils/normalize.js";

const BASE_URL = 'https://www.cheapshark.com/api/1.0';

let storesCache = null;

export async function searchGameByTitle(title) {
  const url = new URL(`${BASE_URL}/games`);
  url.searchParams.set('title', title);
  url.searchParams.set('limit', 10);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`CheapShark API error: ${response.status}`);
  }
  return response.json();
}

export async function getGameDeals(cheapSharkId) {
  const url = new URL(`${BASE_URL}/games`);
  url.searchParams.set('id', cheapSharkId);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`CheapShark API error: ${response.status}`);
  }
  return response.json();
}

export async function getStores() {
  if (storesCache) {
    return storesCache;
  }

  const url = new URL(`${BASE_URL}/stores`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`CheapShark API error: ${response.status}`);
  }

  const stores = await response.json();

  // Monta um mapa { "11": "Green Man Gaming", "1": "Steam", ... }
  storesCache = stores.reduce((map, store) => {
    map[store.storeID] = store.storeName;
    return map;
  }, {});

  return storesCache;
}

export async function findBestMatch(rawgTitle) {
  const results = await searchGameByTitle(rawgTitle);

  if (!results || results.length === 0) {
    return null;
  }

  const normalizedTarget = normalizeTitle(rawgTitle);

  const exactMatch = results.find(
    (game) => normalizeTitle(game.external) === normalizedTarget
  );

  return exactMatch || results[0];
export async function getGameDealsWithStoreNames(cheapSharkId) {
  const [dealsData, stores] = await Promise.all([
    getGameDeals(cheapSharkId),
    getStores(),
  ]);

  const dealsWithStoreNames = dealsData.deals.map((deal) => ({
    ...deal,
    storeName: stores[deal.storeID] || 'Unknown Store',
  }));

  return {
    ...dealsData,
    deals: dealsWithStoreNames,
  };
}