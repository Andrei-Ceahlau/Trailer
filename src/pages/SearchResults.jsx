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
  const API_KEY = "2ac6f0215c6dc9f9ffa71c2b1b3f9e82"; // 🔥 API direct în cod

  useEffect(() => {
    if (!query) return;

    axios
      .get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`)
      .then((response) => setMovies(response.data.results || []))
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
            <Link to={`/movie/${movie.id}`} key={movie.id} className="search-movie-card">
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500"}
                alt={movie.title}
                className="search-movie-image"
              />
              <h5 className="search-movie-title">
                {movie.title} ({movie.release_date?.split("-")[0] || "Unknown"})
              </h5>
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
