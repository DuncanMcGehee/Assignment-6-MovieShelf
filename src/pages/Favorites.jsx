import { useState } from 'react';
import MovieGrid from '../components/MovieGrid';
import { getFavorites } from '../services/favoritesService';

function Favorites() {
  // Load saved favorites once when the page first renders
  const [favoriteMovies, setFavoriteMovies] = useState(() => getFavorites());

  // MovieCard calls this after a favorite is added or removed,
  // so we re-read storage and the grid updates immediately
  const handleFavoriteChange = () => {
    setFavoriteMovies(getFavorites());
  };

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>My Favorites</h2>
        <p>Your saved movies collection</p>
      </div>
      {favoriteMovies.length > 0 ? (
        <MovieGrid
          movies={favoriteMovies}
          onFavoriteChange={handleFavoriteChange}
        />
      ) : (
        <div className="empty-state">
          <p>No favorite movies yet. Start adding some from the home page!</p>
        </div>
      )}
    </main>
  );
};

export default Favorites;