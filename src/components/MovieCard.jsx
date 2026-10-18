import { useState } from 'react';
import { getFavorites, saveFavorites } from '../services/favoritesService';

const FALLBACK_POSTER = 'https://placehold.co/300x450/667eea/ffffff?text=No+Poster';

function MovieCard({ movie, onFavoriteChange }) {
  // Start from whatever is already saved, so the button is correct on load
  const [isFavorite, setIsFavorite] = useState(() =>
    getFavorites().some(fav => fav.id === movie.id)
  );

  const toggleFavorite = () => {
    const favorites = getFavorites();

    if (isFavorite) {
      // Remove: filter creates a new array without this movie
      saveFavorites(favorites.filter(fav => fav.id !== movie.id));
      setIsFavorite(false);
    } else {
      // Add: spread creates a new array, and .some prevents duplicates
      if (!favorites.some(fav => fav.id === movie.id)) {
        saveFavorites([...favorites, movie]);
      }
      setIsFavorite(true);
    }

    // Lets a parent (the Favorites page) refresh its list. Optional.
    if (onFavoriteChange) {
      onFavoriteChange();
    }
  };

  // Some movies have no poster_path (null), so fall back to a placeholder
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : FALLBACK_POSTER;

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={posterUrl} alt={movie.title} />
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-details">
          <span className="movie-rating">⭐ {movie.vote_average.toFixed(1)}</span>
          <span className="movie-year">
            {movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}
          </span>
        </div>
        <button
          className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
          onClick={toggleFavorite}
        >
          {isFavorite ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;