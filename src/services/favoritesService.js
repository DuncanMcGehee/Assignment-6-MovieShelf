const FAVORITES_KEY = 'movieshelf-favorites';

// Read favorites safely. Fall back to an empty list if storage is blocked,
// the JSON is malformed, or the stored value isn't an array.
export function getFavorites() {
  try {
    const saved = localStorage.getItem(FAVORITES_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('Could not load favorites from localStorage:', error);
    return [];
  }
}

export function saveFavorites(favorites) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.warn('Could not save favorites to localStorage:', error);
  }
}