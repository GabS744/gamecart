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