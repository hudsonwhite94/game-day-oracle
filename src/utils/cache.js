export async function getCachedOrFetch(key, fetchFn) {
  if (typeof window === 'undefined') {
    // If running on the server (e.g. during build), skip caching
    return await fetchFn();
  }

  const cached = localStorage.getItem(key);
  if (cached) return JSON.parse(cached);
  const data = await fetchFn();
  localStorage.setItem(key, JSON.stringify(data));
  return data;
}
