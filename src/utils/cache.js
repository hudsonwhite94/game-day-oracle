export async function getCachedOrFetch(key, fetchFn) {
    const cached = localStorage.getItem(key);
    if (cached) {
      return JSON.parse(cached);
    }
  
    const data = await fetchFn();
    localStorage.setItem(key, JSON.stringify(data));
    return data;
  }
  