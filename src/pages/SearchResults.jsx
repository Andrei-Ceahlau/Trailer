// src/pages/SearchResults.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/SearchResults.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery().get("query");
  const [movies, setMovies] = useState([]);
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    if (!query) return;

    axios
      .get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`)
      .then((response) => setMovies(response.data.results))
      .catch((error) => console.error("Error fetching search results:", error));
  }, [query, API_KEY]);

  return (
    <div className="search-results-wrapper">
      <h2 className="search-title">
        Search Results for: <span className="search-query">{query}</span>
      </h2>
      <div className="search-movies-grid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id} className="search-movie-card"> {/* 🔥 Acum fiecare film e clickabil */}
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="search-movie-image"
              />
              <h5 className="search-movie-title">{movie.title} ({movie.release_date?.split("-")[0]})</h5>
            </Link>
          ))
        ) : (
          <p className="no-results-message">No results found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
