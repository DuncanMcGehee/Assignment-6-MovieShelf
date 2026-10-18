import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import { searchMovies } from './services/movieService';
import './App.css';

function App() {
  // Search state lives here because both Header and Home need it.
  // null means "no search yet", so Home shows the popular movies.
  const [searchResults, setSearchResults] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  // Called by the Header when the user searches
  const handleSearch = async (query) => {
    try {
      setSearchLoading(true);
      setSearchError(null);
      const results = await searchMovies(query);
      setSearchResults(results);
    } catch (err) {
      setSearchError('Failed to search movies. Please try again.');
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <Router>
      <div className="app">
        <Header onSearch={handleSearch} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                searchResults={searchResults}
                searchLoading={searchLoading}
                searchError={searchError}
              />
            }
          />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;