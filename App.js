import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=${searchTerm}`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.log('Error searching movies:', error);
    }
  };

  return (
    <div className="container">
      <form className="search-container" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          placeholder="Search movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {movies.length === 0 ? (
        <p className="no-results">No movies found.</p>
      ) : (
        <ul className="movie-list">
          {movies.map((movie) => (
            <li key={movie.id} className="movie-item">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <div>
                <h2 className="movie-title">{movie.title}</h2>
                <p className="movie-release">
                  Release Date: {movie.release_date}
                </p>
                <p className="movie-overview">{movie.overview}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
