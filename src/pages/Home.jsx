import { useState, useEffect } from 'react';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getPopularMovies } from '../services/movieService';

function Home({ searchResults, searchLoading, searchError }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch popular movies once, after the first render
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const movieData = await getPopularMovies();
        setMovies(movieData);
      } catch (err) {
        setError('Failed to load movies. Please try again later.');
        setMovies([]); // empty array so .map never breaks
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // If the user has searched, show those results. Otherwise show popular movies.
  const displayMovies = searchResults || movies;

  if (loading || searchLoading) {
    return (
      <main className="main-content">
        <LoadingSpinner message="Loading movies..." />
      </main>
    );
  }

  if (error || searchError) {
    return (
      <main className="main-content">
        <ErrorMessage message={error || searchError} />
      </main>
    );
  }

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>{searchResults ? 'Search Results' : 'Popular Movies'}</h2>
        <p>Discover and save your favorite films</p>
      </div>

      {displayMovies.length > 0 ? (
        <MovieGrid movies={displayMovies} />
      ) : (
        <div className="empty-state">
          <p>No movies found. Try a different search.</p>
        </div>
      )}
    </main>
  );
};

export default Home;